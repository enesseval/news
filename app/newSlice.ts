import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { serializedNew } from "../types/types"; // TypeScript türünü import et

interface NewsState {
   selectedNews: serializedNew | null;
}

const initialState: NewsState = {
   selectedNews: null,
};

const newsSlice = createSlice({
   name: "news",
   initialState,
   reducers: {
      setSelectedNews(state, action: PayloadAction<serializedNew | null>) {
         state.selectedNews = action.payload;
      },
   },
});

export const { setSelectedNews } = newsSlice.actions;
export default newsSlice.reducer;
