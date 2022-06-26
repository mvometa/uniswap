export type OptionsValue = {
  value: string;
  label: string;
};

export type SelectCallback = {
  onSelectCallback?: (selectValue: string) => void | undefined;
  onReset?: boolean;
};
