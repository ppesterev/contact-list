import { useState } from "react";

import { useAppDispatch } from "../store/hooks";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

import Phone from "@material-ui/icons/Phone";
import Public from "@material-ui/icons/Public";
import Mail from "@material-ui/icons/Mail";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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
  card: {
    maxWidth: "400px"
  },
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

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={classes.card}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        wrap="nowrap"
        component="header"
      >
        <Typography variant="body1" component={ContextualHeading} gutterBottom>
          {name}{" "}
          <Typography variant="body1" component="span" color="textSecondary">
            ({username})
          </Typography>
        </Typography>
        <IconButton
          size="small"
          color={isFavorite ? "primary" : "default"}
          onClick={() => dispatch(setFavorite({ id, isFavorite: !isFavorite }))}
          aria-label={isFavorite ? "unfavorite" : "favorite"}
        >
          {isFavorite ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>
      </Grid>

      <HeadingRegion>
        <Grid container justifyContent="space-between" alignItems="flex-end">
          <Grid item>
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
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => setIsExpanded((is) => !is)}
              size="small"
              aria-label={isExpanded ? "more" : "less"}
            >
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={isExpanded}>
          <Button color="primary" onClick={() => onEditContact(id)}>
            Edit
          </Button>
          <Button color="primary" onClick={() => dispatch(deleteContact(id))}>
            Delete
          </Button>
        </Collapse>
      </HeadingRegion>
    </article>
  );
}
