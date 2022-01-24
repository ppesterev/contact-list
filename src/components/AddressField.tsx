import { InputHTMLAttributes } from "react";

import { useField } from "formik";
import { Form, Button } from "react-bulma-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onAddLine: () => void;
  onRemoveLine: () => void;
}

export default function AddressField({ name, onAddLine, onRemoveLine }: Props) {
  const [input, meta, helpers] = useField(name);

  return (
    <Form.Field kind="addons">
      <Form.Control fullwidth>
        <Form.Input {...input} />
      </Form.Control>
      <Form.Control>
        <Button type="button" aria-label="Add line" onClick={onAddLine}>
          +
        </Button>
      </Form.Control>
      <Form.Control>
        <Button type="button" aria-label="Remove line" onClick={onRemoveLine}>
          -
        </Button>
      </Form.Control>
    </Form.Field>
  );
}
