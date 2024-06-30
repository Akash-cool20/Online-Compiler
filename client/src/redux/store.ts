import { configureStore } from "@reduxjs/toolkit";
import complierSlice from "./slices/complierSlice";
import { api } from "./slices/api";
import appSlice from "./slices/appSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        complierSlice,
        appSlice,
    },
    middleware:(getDefaultMiddlerware)=>getDefaultMiddlerware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;