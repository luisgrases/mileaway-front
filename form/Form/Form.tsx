import React, {
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
  useEffect,
} from "react";

import { formStoreFactory } from "./formState";
import { useValueGetters } from "./useValueGetters";

import {
  FormConfig,
  FieldData,
  FormStore,
  FormStatus,
  GenericFormValues,
  ExternalFormStatus,
} from "./types";
import { View } from "components";

export const FormContext = createContext<FormStore>(undefined);

export interface UseForm<FormValues> extends Omit<FormStatus, "errorFields"> {
  Form: React.FC<React.AllHTMLAttributes<HTMLFormElement>>;
  formStore: FormStore<FormValues>;
  handleSubmit: FormStore<FormValues>["handleSubmit"];
  reset: FormStore<FormValues>["reset"];
  updateFormState: FormStore<FormValues>["updateState"];
  values: FormValues;
  errors: Record<string, unknown>;
  touched: Record<string, unknown>;
}

export function useForm<FormValues = GenericFormValues>(
  config: FormConfig<FormValues>
): UseForm<FormValues> {
  const formConfig = useRef(config);
  const store = useRef<FormStore<FormValues>>();

  if (!store.current) {
    store.current = formStoreFactory<FormValues>(formConfig.current);
  }

  const formStatus = useFormStatus(false, store.current);

  useEffect(() => {
    if (config.onSubmit !== formConfig.current.onSubmit) {
      formConfig.current.onSubmit = config.onSubmit;
    }
    if (config.validate !== formConfig.current.validate) {
      formConfig.current.validate = config.validate;
    }
    if (config.initialValues !== formConfig.current.initialValues) {
      formConfig.current.initialValues = config.initialValues;
      store.current!.reset(config.initialValues);
    }
  }, [config.onSubmit, config.validate, config.initialValues]);

  const Form = useCallback(function Form(props) {
    return (
      <FormContext.Provider value={store.current!}>
        <View {...props} />
      </FormContext.Provider>
    );
  }, []);

  return useValueGetters(
    {
      Form,
      ...formStatus,
      handleSubmit: store.current.handleSubmit,
      reset: store.current.reset,
      formStore: store.current,
      updateFormState: store.current.updateState,
    },
    store.current
  ) as UseForm<FormValues>;
}

export function useFormField<Value, FormValues = GenericFormValues>(
  path = "",
  optionalFormStore?: FormStore<FormValues>
): {
  error: string;
  setError: (error?: string) => void;
  setTouched: (isTouched?: boolean) => void;
  setValue: (newValue: Value) => void;
  touched: boolean;
  value: Value;
} {
  const formStore = useContext(FormContext) || optionalFormStore;
  const [[value, error, touched], setFieldState] = useState<FieldData<any>>(
    formStore.get(path)
  );

  useEffect(() => {
    setFieldState(formStore.get(path));
    return formStore.subscribeToValue(path, setFieldState);
  }, [path]);

  const setValue = useCallback(
    (newValue: any) => formStore.updateState("values", path, newValue),
    [formStore, path]
  );

  const setTouched = useCallback(
    // Most likely this callback will  be used in the field on blur handler,
    // when in most cases we want to mark field as touched, when user blurs it.
    (isTouched?: boolean) =>
      formStore.updateState("touched", path, isTouched ?? true),
    [formStore, path]
  );

  const setError = useCallback(
    (newError?: string) => {
      formStore.updateState("fieldErrors", path, newError);
    },
    [formStore, path]
  );

  return {
    error,
    setError,
    setTouched,
    setValue,
    touched,
    value,
  };
}

export function useFormStatus<FormValues = GenericFormValues>(
  includeErrorFields = false,
  optionalFormStore?: FormStore<FormValues>
): ExternalFormStatus {
  const formStore = useContext(FormContext) || optionalFormStore;
  const formStatus = formStore.getStatus();
  const [isDirty, setDirty] = useState(formStatus.isDirty);
  const [isValid, setValid] = useState(formStatus.isValid);
  const [isValidating, setValidating] = useState(formStatus.isValidating);
  const [isSubmitting, setSubmitting] = useState(formStatus.isSubmitting);
  const [errorFields, setErrorFields] = useState(
    Object.keys(formStatus.flatErrors!)
  );
  const [asyncFields, setAsyncFields] = useState(
    Object.keys(formStatus.flatAsyncValidations!)
  );

  useEffect(
    () =>
      formStore.subscribeToFormStatus((updatedFormStatus: FormStatus) => {
        setDirty(updatedFormStatus.isDirty);
        setValid(updatedFormStatus.isValid);
        setValidating(updatedFormStatus.isValidating);
        setSubmitting(updatedFormStatus.isSubmitting);
        setSubmitting(updatedFormStatus.isSubmitting);

        if (includeErrorFields) {
          setErrorFields(Object.keys(updatedFormStatus.flatErrors!));
          setAsyncFields(Object.keys(updatedFormStatus.flatAsyncValidations!));
        }
      }),

    []
  );

  const returnedStatus: ExternalFormStatus = {
    isDirty,
    isSubmitting,
    isValid,
    isValidating,
  };

  if (includeErrorFields) {
    returnedStatus.errorFields = errorFields;
    returnedStatus.asyncFields = asyncFields;
  }

  return returnedStatus;
}
