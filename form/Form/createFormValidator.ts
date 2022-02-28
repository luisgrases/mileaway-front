import {
  FieldValue,
  ValidationSchema,
  Validator,
  FieldErrors,
  GenericFormValues,
} from "form/Form/types";

/**
 * A helper function that transforms a validation schema
 * into validation function, that accepts values and returns
 * object with errors
 *
 * @param schema
 */
export function createFormValidator<FormValues = GenericFormValues>(
  schema: ValidationSchema<FormValues, FormValues>
): Validator<FormValues> {
  const validationSchema: ValidationSchema<FormValues, FormValues> =
    Object.keys(schema).reduce(
      (accumSchema, key: string): ValidationSchema<FormValues, FormValues> => {
        if (typeof schema[key as keyof FormValues] === "function") {
          accumSchema[key as keyof FormValues] =
            schema[key as keyof FormValues];
        } else if (Array.isArray(schema[key as keyof FormValues])) {
          accumSchema[key as keyof FormValues] = (value, values) => {
            for (
              let i = 0;
              i < (schema[key as keyof FormValues] as []).length;
              i++
            ) {
              const error = (
                schema[key as keyof FormValues] as Validator<FormValues>[]
              )[i](value, values);
              if (error) return error;
            }
          };
        } else if (typeof schema[key as keyof FormValues] === "object") {
          accumSchema[key as keyof FormValues] = createFormValidator(
            schema[key as keyof FormValues] as ValidationSchema
          );
        }

        return accumSchema;
      },
      {} as ValidationSchema<FormValues, FormValues>
    );
  return (
    values: { [key: string]: FieldValue } = {},
    allValues: FormValues
  ) => {
    return Object.keys(validationSchema).reduce(
      (
        accumErrors: { [key: string]: FieldErrors },
        key: string
      ): FieldErrors => {
        accumErrors[key] = (
          validationSchema[key as keyof typeof validationSchema] as Validator
        )(values[key], allValues || values) as FieldErrors;
        return accumErrors;
      },
      {}
    );
  };
}
