import set from "lodash/fp/set";
import get from "lodash/get";
import merge from "lodash/merge";

import { createFormValidator } from "./createFormValidator";

import { flattenObject, focusFormField, isEqual } from "./utils";

import {
  FormConfig,
  FormStore,
  FieldListener,
  StatusListener,
  FormState,
  FieldData,
  FieldErrors,
  FormStateUpdater,
  FieldValue,
  UpdatePatch,
  FormValidator,
  ValidationSchema,
  FormErrors,
} from "./types";

const EMPTY_OBJECT = {};

export function getValidator<FormValues>(
  validatorOrScheme: FormValidator<FormValues> | ValidationSchema<FormValues>
): FormValidator<FormValues> {
  if (typeof validatorOrScheme === "function") {
    // Typescript throw an error `Excessive stack depth comparing types`
    // Seems like a bug in typescript itself
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return validatorOrScheme as FormValidator<FormValues>;
  } else {
    return createFormValidator(validatorOrScheme) as FormValidator<FormValues>;
  }
}

/**
 * A function that runs validation and returns a form validation
 */
export function getValidationState<FormValues>(
  values: DeepPartial<FormValues>,
  validationConfig?: FormConfig<FormValues>["validate"],
  fieldErrors: { [key in keyof FormValues]?: FieldErrors } = EMPTY_OBJECT,
  previousFlatErrors: { [key: string]: string } = EMPTY_OBJECT
): {
  asyncFlatValidations: { [key: string]: Promise<FieldErrors> };
  resolvedErrors: FormErrors<FormValues>;
  resolvedFlatErrors: { [key: string]: string };
  isValid: boolean;
  isValidating: boolean;
  updatedFields: string[];
} {
  const errors = validationConfig ? getValidator(validationConfig)(values) : {};
  const flatErrors = flattenObject(merge(errors, fieldErrors));
  const resolvedFlatErrors: { [key: string]: string } = {};
  const asyncFlatValidations: { [key: string]: Promise<FieldErrors> } = {};
  let resolvedErrors: FormErrors<FormValues> = {};

  for (const path in flatErrors) {
    const error = flatErrors[path];

    if (typeof error?.then === "function") {
      asyncFlatValidations[path] = error;
    } else if (error) {
      resolvedFlatErrors[path] = error;
      resolvedErrors = set(path, error)(resolvedErrors);
    }
  }

  // Calculate a symmetrical difference of previous error fields
  // and new error fields
  const updatedErrorFields = Object.keys(previousFlatErrors)
    .filter(
      (path) =>
        // Check if a new error was added
        !resolvedFlatErrors[path] ||
        // Check if error was changed from the previous one
        resolvedFlatErrors[path] !== previousFlatErrors[path]
    )
    .concat(
      Object.keys(resolvedFlatErrors).filter(
        // Check if error was resolved
        (path) => !previousFlatErrors[path]
      )
    );

  return {
    asyncFlatValidations,
    resolvedErrors,
    resolvedFlatErrors,
    isValid: !(
      Object.keys(resolvedFlatErrors).length +
      Object.keys(asyncFlatValidations).length
    ),
    isValidating: Boolean(Object.keys(asyncFlatValidations).length),
    updatedFields: updatedErrorFields,
  };
}

export function formStoreFactory<FormValues>(
  config: FormConfig<FormValues> = {}
): FormStore<FormValues> {
  const { initialValues = {} } = config;
  const listeners: { [path: string]: FieldListener[] } = {};
  let statusListeners: StatusListener[] = [];
  let formState: FormState<FormValues>;
  let internalInitialValues: DeepPartial<FormValues>;
  let dirtyFields: Set<string>;

  const processAsyncErrors = (asyncValdiations: {
    [key: string]: Promise<FieldErrors>;
  }) => {
    for (const path in asyncValdiations) {
      let updatePatches: UpdatePatch<FieldValue, FormValues>[] = [];
      let isFieldValid = false;
      let newFlatErrors: { [key: string]: FieldErrors } = {
        ...formState.formStatus.flatErrors,
      };
      asyncValdiations[path]
        .then((error) => {
          if (error) {
            newFlatErrors = {
              ...formState.formStatus.flatErrors,
              [path]: error,
            };
            updatePatches = [
              ["errors", path, error],
              ["formStatus", "isValid", false],
              ["formStatus", "flatErrors", newFlatErrors],
            ];
          } else isFieldValid = true;
        })
        .finally(() => {
          const newValidatingFields = {
            ...formState.formStatus.flatAsyncValidations,
          };
          delete newValidatingFields[path];

          const isLastValidation = !Object.keys(newValidatingFields).length;

          if (
            isFieldValid &&
            isLastValidation &&
            !Object.keys(newFlatErrors).length
          ) {
            updatePatches.push(["formStatus", "isValid", true]);
          }

          updateState([
            ...updatePatches,
            ["formStatus", "flatAsyncValidations", newValidatingFields],
            ["formStatus", "isValidating", !isLastValidation],
          ]);
        });
    }
  };

  const init = (values: DeepPartial<FormValues> = {}): void => {
    // Flat initial values help to quickly check if new value is
    // not equal to the initial value in update state function.
    // It is faster to read from the flat object, than from a deep one
    // using lodash get().
    internalInitialValues = values;
    dirtyFields = new Set();
    const validationState = getValidationState(values, config.validate);

    formState = {
      values: values,
      errors: validationState.resolvedErrors,
      fieldErrors: {},
      touched: {},
      formStatus: {
        isDirty: false,
        isValid: validationState.isValid,
        isValidating: validationState.isValidating,
        isSubmitting: false,
        flatErrors: validationState.resolvedFlatErrors,
        flatAsyncValidations: validationState.asyncFlatValidations,
      },
    };

    processAsyncErrors(validationState.asyncFlatValidations);
  };

  init(initialValues);

  const notify = (...paths: string[]) => {
    paths.forEach((path) => {
      if (listeners[path] && listeners[path].length) {
        const valueState = getValueState(path);
        listeners[path].forEach((l) => l(valueState));
      }
    });
  };
  const notifyStatusListeners = () => {
    if (statusListeners.length) {
      statusListeners.forEach((l) => l(formState.formStatus));
    }
  };

  const getValueState = (path: string): FieldData =>
    path
      ? [
          get(formState.values, path),
          get(formState.errors, path),
          get(formState.touched, path),
        ]
      : [formState.values, formState.errors, formState.touched];

  const touchErrorFields = (errorFields: string[]) => {
    errorFields.forEach((fieldName) => {
      formState.touched = set(fieldName, true)(formState.touched);
    });
    notify(...errorFields);
  };

  const updateState: FormStateUpdater<FieldValue, FormValues> = (
    keyOrUpdates,
    aPath,
    aValue
  ) => {
    const updates: UpdatePatch<FieldValue, FormValues>[] = Array.isArray(
      keyOrUpdates
    )
      ? keyOrUpdates
      : [[keyOrUpdates, aPath, aValue]];

    updates.forEach(([key, path, value]) => {
      formState = set(`${key}.${path}`, value)(formState);

      if (key === "values") {
        if (isEqual(get(internalInitialValues, path), value)) {
          dirtyFields.delete(path);
        } else {
          dirtyFields.add(path);
        }
        formState.formStatus.isDirty = Boolean(dirtyFields.size);
      }
    });

    let updatedErrorFields: string[] = [];
    // We need to run validations if one of the values changed.
    // In other cases, errors should already be up to date
    if (updates.some(([key]) => key === "values" || key === "fieldErrors")) {
      const validationState = getValidationState(
        formState.values,
        config.validate,
        formState.fieldErrors,
        formState.formStatus.flatErrors
      );

      const formStatus = {
        ...formState.formStatus,
        isValid: validationState.isValid,
        isValidating: validationState.isValidating,
        flatErrors: validationState.resolvedFlatErrors,
        flatAsyncValidations: validationState.asyncFlatValidations,
      };

      updatedErrorFields = validationState.updatedFields;
      formState.errors = validationState.resolvedErrors;
      formState.formStatus = formStatus;

      processAsyncErrors(validationState.asyncFlatValidations);
    }

    // We use set to dedupe the fields from errors and updates, and then convert
    // it back to array
    const updatedFields = [
      ...new Set([
        ...updatedErrorFields,
        ...updates.map(([_key, path]) => path),
      ]),
    ];

    const fieldsToNotify = Object.keys(listeners).filter((listenerPath) =>
      updatedFields.some(
        (path) => path.startsWith(listenerPath) || listenerPath.startsWith(path)
      )
    );
    notify("", ...fieldsToNotify);
    notifyStatusListeners();
  };

  const handleSubmit = async (
    event?: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (config.onSubmit) {
      if (event) {
        event.preventDefault();
      }

      const { formStatus, values } = formState;

      if (!formStatus.isValid) {
        const errorFields = Object.keys(formStatus.flatErrors!);
        if (errorFields.length) {
          touchErrorFields(errorFields);
          focusFormField(errorFields[0]);
        } else if (formStatus.isValidating) {
          const asyncValidationFields = Object.keys(
            formStatus.flatAsyncValidations!
          );
          focusFormField(asyncValidationFields[0]);
        }
      } else {
        updateState("formStatus", "isSubmitting", true);
        return Promise.resolve(
          config.onSubmit(values as FormValues, {
            dirtyFields: [...dirtyFields],
            reset: init,
          })
        )
          .catch((err) => {
            console.error("There was an error submitting a form", err);
          })
          .finally(() => {
            updateState("formStatus", "isSubmitting", false);
          });
      }
    }
  };

  const reset = (values: DeepPartial<FormValues>): void => {
    init(values);
    notify("", ...Object.keys(listeners));
    notifyStatusListeners();
  };

  return {
    // Put it there for the access to the store in debugging
    getState() {
      return formState;
    },
    get: getValueState,

    getStatus() {
      return formState.formStatus;
    },

    handleSubmit,
    reset,

    subscribeToValue: (path: string, cb: FieldListener) => {
      (listeners[path] || (listeners[path] = [])).push(cb);
      return () => {
        listeners[path] = listeners[path].filter((l) => l !== cb);
      };
    },

    subscribeToFormStatus: (cb) => {
      statusListeners.push(cb);
      return () => {
        statusListeners = statusListeners.filter((l) => l !== cb);
      };
    },

    updateState,
  };
}
