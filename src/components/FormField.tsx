import { InputHTMLAttributes } from "react";

import { useField } from "formik";
import { Form } from "react-bulma-components";

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
    <Form.Field>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control>
        <Form.Input
          {...rest}
          {...input}
          color={meta.touched ? (meta.error ? "danger" : "success") : undefined}
        />
      </Form.Control>
      {meta.error && meta.touched && <Form.Help>{meta.error}</Form.Help>}
    </Form.Field>
  );
}
