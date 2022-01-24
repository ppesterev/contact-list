import { InputHTMLAttributes } from "react";

import { useField } from "formik";

import TextField from "@material-ui/core/TextField";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export default function FormField({
  name,
  label,
  color,
  unselectable,
  size,
  ...rest
}: Props) {
  const [input, meta, helpers] = useField(name);

  return (
    <TextField
      {...input}
      {...rest}
      label={label}
      error={!!(meta.error && meta.touched)}
      helperText={meta.touched ? meta.error : null}
      fullWidth
      margin="normal"
    />
  );
}
