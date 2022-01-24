import { useAppDispatch } from "../store/hooks";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Phone from "@material-ui/icons/Phone";
import Public from "@material-ui/icons/Public";
import Mail from "@material-ui/icons/Mail";

import {
  setFavorite,
  deleteContact
} from "../store/slices/contacts/contactsSlice";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";

import { ContactRecord, ID } from "../types";

import { makeStyles } from "@material-ui/core/styles";

interface Props {
  record: ContactRecord;
  onEditContact: (id: ID) => void;
}

const useStyles = makeStyles((theme) => ({
  icon: {
    fill: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
    width: "20px",
    height: "20px",
    verticalAlign: "middle"
  }
}));

export default function ContactCard({ record, onEditContact }: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const {
    id,
    contact: { name, email, username, phone, website, address },
    isFavorite
  } = record;

  return (
    <article>
      <Typography variant="body1" component={ContextualHeading} gutterBottom>
        {name}{" "}
        <Typography variant="body1" component="span" color="textSecondary">
          ({username})
        </Typography>
      </Typography>
      <HeadingRegion>
        <Typography variant="body2" gutterBottom>
          <Mail className={classes.icon} />
          <Link href={`mailto:${email}`}>{email}</Link>
        </Typography>
        {phone && (
          <Typography variant="body2" gutterBottom>
            <Link href={`tel:${phone}`}>
              <Phone className={classes.icon} />
              {phone}
            </Link>
          </Typography>
        )}
        {website && (
          <Typography variant="body2" gutterBottom>
            <Link href={website}>
              <Public className={classes.icon} />
              {website}
            </Link>
          </Typography>
        )}
        <button onClick={() => onEditContact(id)}>Edit contact</button>
        <button
          onClick={() => dispatch(setFavorite({ id, isFavorite: !isFavorite }))}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <button onClick={() => dispatch(deleteContact(id))}>
          Delete contact
        </button>
      </HeadingRegion>
    </article>
  );
}
