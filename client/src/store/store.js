// store configuration function from toolkit
import { configureStore } from "@reduxjs/toolkit";

// importing slices to combine in the reducer
import formEntriesSlice from "./formEntries-slice";

// creating store
const store = configureStore({
    reducer: formEntriesSlice.reducer,
});

// exporting store to the app
export default store;