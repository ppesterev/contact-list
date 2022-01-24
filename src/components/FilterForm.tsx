import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Search from "@material-ui/icons/Search";

import {
  setSearch,
  setOnlyFavorites
} from "../store/slices/filters/filtersSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getFilters } from "../store/selectors";

export default function FilterForm() {
  const dispatch = useAppDispatch();
  const { search, onlyFavorites } = useAppSelector(getFilters);

  return (
    <form>
      <Input
        type="text"
        value={search}
        onChange={(evt) => dispatch(setSearch(evt.target.value))}
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        fullWidth
      />
      <FormControlLabel
        label="Show favorites only"
        control={
          <Checkbox
            color="primary"
            checked={onlyFavorites}
            onChange={(evt) => dispatch(setOnlyFavorites(evt.target.checked))}
          />
        }
      />
    </form>
  );
}
