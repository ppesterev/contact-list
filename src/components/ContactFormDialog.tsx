import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import ContactForm from "./ContactForm";

import { Contact } from "../types";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: (contact: Contact) => void;
  initialValue?: Contact;
}

export default function ContactFormDialog({
  show,
  onClose,
  onSubmit,
  initialValue
}: Props) {
  return (
    <Dialog open={show} onClose={onClose}>
      <DialogTitle>{initialValue ? "Edit" : "Add"} contact</DialogTitle>
      <DialogContent>
        <ContactForm
          initialValue={initialValue}
          onSubmit={(contact) => {
            onSubmit(contact);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
