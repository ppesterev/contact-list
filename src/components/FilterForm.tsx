import { setSearch, setOnlyFavorites } from "../store/filters/filtersSlice";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getFilters } from "../store/selectors";

export default function FilterForm() {
  const dispatch = useAppDispatch();
  const { search, onlyFavorites } = useAppSelector(getFilters);

  return (
    <form>
      <label>
        Search:
        <input
          type="text"
          value={search}
          onChange={(evt) => dispatch(setSearch(evt.currentTarget.value))}
        />
      </label>
      <label>
        <input
          type="checkbox"
          checked={onlyFavorites}
          onChange={(evt) =>
            dispatch(setOnlyFavorites(evt.currentTarget.checked))
          }
        />
        Only show favorites
      </label>
    </form>
  );
}
