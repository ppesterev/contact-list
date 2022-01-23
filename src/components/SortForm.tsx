import { sortBy, setDirection } from "../store/sorting/sortingSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";

import { SORTING_OPTIONS } from "../const";

export default function SortForm() {
  const dispatch = useAppDispatch();
  const { sortedBy, isDescending } = useAppSelector((state) => state.sorting);
  return (
    <form>
      <select
        value={sortedBy}
        onChange={(evt) => {
          let option = SORTING_OPTIONS.find(
            (opt) => opt === evt.currentTarget.value
          );
          if (!option) {
            return;
          }
          dispatch(sortBy(option));
        }}
      >
        {SORTING_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            By {opt}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => dispatch(setDirection(!isDescending))}
      >
        {isDescending ? "Desc." : "Asc."}
      </button>
    </form>
  );
}
