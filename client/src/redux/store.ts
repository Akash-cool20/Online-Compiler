import { configureStore } from "@reduxjs/toolkit";
import complierSlice from "./slices/complierSlice";

export const store = configureStore({
    reducer: {
        complierSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;