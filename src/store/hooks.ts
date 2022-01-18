import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

import store from "./index";

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<Dispatch>();
