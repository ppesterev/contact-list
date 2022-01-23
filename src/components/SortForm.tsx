import { sortBy, setDirection } from "../store/slices/sorting/sortingSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getSorting } from "../store/selectors";

import { SORTING_OPTIONS } from "../const";

export default function SortForm() {
  const dispatch = useAppDispatch();
  const { sortedBy, isDescending } = useAppSelector(getSorting);

  const onSortingSelected = (value: string) => {
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
      <select
        value={sortedBy}
        onChange={(evt) => onSortingSelected(evt.target.value)}
      >
        {SORTING_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            By {opt}
          </option>
        ))}
      </select>
      <button type="button" onClick={onSortDirectionChanged}>
        {isDescending ? "Desc." : "Asc."}
      </button>
    </form>
  );
}
