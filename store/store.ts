import { configureStore } from "@reduxjs/toolkit";
import manageData from "./manageData";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
	reducer: { manageData: manageData },
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;
