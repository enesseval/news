import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./newSlice"; // Reducer'ı import et

const store = configureStore({
   reducer: {
      news: newsReducer, // Reducer'ı store'a ekle
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
