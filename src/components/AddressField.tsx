import { InputHTMLAttributes } from "react";

import { useField } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onAddLine: () => void;
  onRemoveLine: () => void;
}

export default function AddressField({ name, onAddLine, onRemoveLine }: Props) {
  const [input, meta, helpers] = useField(name);

  return (
    <FormControl fullWidth margin="dense">
      <Input
        {...input}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onAddLine} aria-label="Add line" size="small">
              <Add />
            </IconButton>
            <IconButton
              onClick={onRemoveLine}
              aria-label="Remove line"
              size="small"
            >
              <Remove />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
