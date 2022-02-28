import { isEmpty } from "lodash";

export const isRequired =
  (
    msg = "Field is required",
    {
      trimString = true,
      zeroMeanValue = true,
    }: { trimString?: boolean; zeroMeanValue?: boolean } = {}
  ) =>
  (value: any): string | void => {
    if (value === true || value === false) return undefined;
    if (!value && !(zeroMeanValue && value === 0)) return msg;
    if (typeof value === "string" && trimString) {
      return value.trim() ? undefined : msg;
    }
    if (zeroMeanValue && value === 0) return undefined;

    if (typeof value === "number" && value) return undefined;
    if (Array.isArray(value)) return isEmpty(value) ? msg : undefined;
    if (typeof value === "object" && value) return undefined;
    return isEmpty(value) ? msg : undefined;
  };
