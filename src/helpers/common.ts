export const isBoolean = (value: unknown): boolean =>
  typeof value === "boolean";
export const isNumber = (value: unknown): boolean =>
  /^-?\d+(\.\d+)?$/.test(String(value));

export const getValue = (
  data: { [key: string]: unknown },
  path: string,
  defaultValue?: unknown,
): any => {
  const value: unknown = path
    .split(".")
    .reduce<any>(
      (item = {} as { [key: string]: unknown }, key) => item[key],
      data,
    );

  if (isBoolean(value) || isNumber(value)) return value;

  return value || defaultValue;
};
