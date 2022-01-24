import { InputHTMLAttributes } from "react";

import { useField } from "formik";
import { Form } from "react-bulma-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

export default function FormField({ name, label }: Props) {
  const [input, meta, helpers] = useField(name);

  return (
    <Form.Field>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control>
        <Form.Input {...input} />
      </Form.Control>
      {meta.error && meta.touched && <Form.Help>{meta.error}</Form.Help>}
    </Form.Field>
  );
}
