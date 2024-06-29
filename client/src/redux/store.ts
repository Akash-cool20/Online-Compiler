import { configureStore } from "@reduxjs/toolkit";
import complierSlice from "./slices/complierSlice";
import { api } from "./slices/api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        complierSlice,
    },
    middleware:(getDefaultMiddlerware)=>getDefaultMiddlerware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;