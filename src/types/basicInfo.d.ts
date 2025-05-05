type RequireProps<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type BaseMeta = { label: string };

export type Option = {
  label: string;
  value: string;
};
