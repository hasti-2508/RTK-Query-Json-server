import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ReviewsApi } from "./services/ReviewApi";

export const store = configureStore(
  {  reducer:{
    [ReviewsApi.reducerPath] : ReviewsApi.reducer
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ReviewsApi.middleware)
}
)