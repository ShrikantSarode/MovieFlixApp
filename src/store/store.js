import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice"; // Import the reducer

const store = configureStore({
  reducer: {
    search: searchReducer, // Add searchReducer to the store
  },
});

export default store;
