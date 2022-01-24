import { Modal } from "react-bulma-components";

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
    <Modal show={show} onClose={onClose} showClose closeOnEsc>
      <Modal.Card>
        <Modal.Card.Header>
          <Modal.Card.Title>
            {initialValue ? "Edit" : "Add"} contact
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <ContactForm
            initialValue={initialValue}
            onSubmit={(contact) => {
              onSubmit(contact);
              onClose();
            }}
          />
        </Modal.Card.Body>
      </Modal.Card>
    </Modal>
  );
}
