import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import { RootState, Dispatch } from ".";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<Dispatch>();
