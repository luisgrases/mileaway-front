export const isAlphanumeric =
  (msg = "Only alphanumeric characters are supported") =>
  (value: string) => {
    const regex = /^[a-z0-9]+$/i;
    if (!value.match(regex)) {
      return msg;
    }
  };
