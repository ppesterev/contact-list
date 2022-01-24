import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

import { sortBy, setDirection } from "../store/slices/sorting/sortingSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getSorting } from "../store/selectors";

import { SORTING_OPTIONS } from "../const";

export default function SortForm() {
  const dispatch = useAppDispatch();
  const { sortedBy, isDescending } = useAppSelector(getSorting);

  const onSortingSelected = (value: any) => {
    // appease typescript
    let option = SORTING_OPTIONS.find((opt) => opt === value);
    if (!option) {
      return;
    }
    dispatch(sortBy(option));
  };

  const onSortDirectionChanged = () => dispatch(setDirection(!isDescending));

  return (
    <form>
      <Select
        labelId="sort-option-select-label"
        id="sort-option-select"
        value={sortedBy}
        onChange={(evt) => onSortingSelected(evt.target.value)}
      >
        {SORTING_OPTIONS.map((opt) => (
          <MenuItem key={opt} value={opt}>
            By {opt}
          </MenuItem>
        ))}
      </Select>
      <IconButton type="button" onClick={onSortDirectionChanged} size="small">
        {isDescending ? <ArrowDownward /> : <ArrowUpward />}
      </IconButton>
    </form>
  );
}
