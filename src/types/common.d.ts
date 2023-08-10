declare interface Icountry {
  value: string;
  label: string;
}

declare interface Irules {
  rules: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: RefCallBack;
    name: string;
    min?: string | number | undefined;
    max?: string | number | undefined;
    disabled?: boolean | undefined;
  };
}
