export const ok = (
  data: any = null,
  message = "Success",
  version: string,
  key: string = "data"
) => ({
  success: true,
  version,
  [key]: data,
  message,
});

export const fail = (
  message = "Error",
  data: any = null,
  version: string,
  key: string = "data"
) => ({
  success: false,
  version,
  [key]: data,
  message,
});

export const unauthorized = (message = "Unauthorized", version: string) => ({
  success: false,
  version,
  message,
  code: 401,
});
