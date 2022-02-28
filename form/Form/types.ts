export type FieldValue =
  | string
  | boolean
  | number
  | string[]
  | number[]
  | { [key: string]: FieldValue }

export type FieldData<T = FieldValue> = [
  value: T,
  error: string,
  touched: boolean
]

export type FieldListener = (fieldData: FieldData) => void
export type StatusListener = (formStatus: FormStatus) => void

export type GenericFormValues = {
  [key: string]: FieldValue | GenericFormValues | GenericFormValues[]
}

export type FormStatus = {
  isDirty: boolean
  isValid: boolean
  isValidating: boolean
  isSubmitting: boolean
  flatErrors?: { [key: string]: string }
  flatAsyncValidations?: { [key: string]: Promise<FieldErrors> }
}

export type ExternalFormStatus = {
  isDirty: boolean
  isValid: boolean
  isValidating: boolean
  isSubmitting: boolean
  errorFields?: string[]
  asyncFields?: string[]
}

export type FieldErrors = string | { [key: string]: FieldErrors }
export type Validator<FormValues = GenericFormValues> = (
  values: any,
  allValues?: DeepPartial<FormValues>
) => FieldErrors | void | Promise<FieldErrors | void>

/**
 * A validator for the entire form. It should return an object
 * with errors related to fields or an empty object, if there
 * are no errors
 */
export type FormValidator<FormValues = GenericFormValues> = (
  values: DeepPartial<FormValues>,
  allValues?: DeepPartial<FormValues>
) => { [key in keyof FormValues]?: FieldErrors | Promise<FieldErrors> }

export type ValidationSchema<
  FormValues = GenericFormValues,
  AllFormValues = FormValues
> = {
  [Key in keyof FormValues]?:
    | Validator<AllFormValues>
    | Validator<AllFormValues>[]
    | ValidationSchema<FormValues[Key], AllFormValues>
}

type FormBag<FormValues = GenericFormValues> = {
  dirtyFields: string[]
  reset: (initialValues: DeepPartial<FormValues>) => void
}

export type FormConfig<FormValues = GenericFormValues> = {
  initialValues?: DeepPartial<FormValues>
  onSubmit?: (values: FormValues, formBag: FormBag<FormValues>) => void
  validate?: ValidationSchema<FormValues> | FormValidator<FormValues>
  enableReinitialize?: boolean
  // mapPropsToValues
}

export type FormState<FormValues = GenericFormValues> = {
  values: DeepPartial<FormValues>
  errors: { [key in keyof FormValues]?: FieldErrors }
  // fieldErrors, are errors, that was set directly by the field through
  // useFormField -> setError hook
  // Those errors will be merged to the errors from the form validation
  fieldErrors: { [key in keyof FormValues]?: FieldErrors }
  touched: { [key in keyof FormValues]?: boolean }
  formStatus: FormStatus
}
export type FormStateTuple<FormValues extends GenericFormValues> = [
  FormState<FormValues>['values'],
  FormState<FormValues>['errors'],
  FormState<FormValues>['touched']
]

export type UpdatePatch<
  Value = FieldValue,
  FormValues = GenericFormValues,
  Key = keyof FormState<FormValues>
> = [Key, string, Key extends 'touched' ? boolean : any]

export type FormStateUpdater<
  Value = FieldValue,
  FormValues = GenericFormValues,
  Key = keyof FormState<FormValues> | UpdatePatch<Value, FormValues>[]
> = (
  keyOrUpdates: Key,
  path?: string,
  values?: Key extends 'touched' ? boolean : Value | string
) => void

export type FormStore<FormValues = GenericFormValues> = {
  getState: () => FormState<FormValues>
  get: (() => FieldData) | ((path: string) => FieldData)
  getStatus: () => FormStatus
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void
  reset: (initialValues?: DeepPartial<FormValues>) => void
  subscribeToFormStatus: (cb: StatusListener) => () => void
  subscribeToValue: (path: string, cb: FieldListener) => () => void
  updateState: FormStateUpdater<FieldValue, FormValues>
}

export type FormEvents<FormValues = GenericFormValues> = {
  blur: { name: keyof FormValues }
  change: { name: keyof FormValues; newValue: string }
  reset: Partial<FormValues>
}

export type FormErrors<FormValues> = { [key in keyof FormValues]?: string }
