import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reviews } from "../models/Review.model";

export const ReviewsApi = createApi({
  tagTypes: ["Review"],
  reducerPath: "ReviewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (builder) => ({
    reviews: builder.query<Reviews[], void>({
      query: () => "/reviews",
      providesTags: ["Review"],
    }),
    review: builder.query<Reviews, number>({
      query: (id) => `/reviews?id=${id}`,
      providesTags: ["Review"],
    }),
    addReview: builder.mutation<void, Reviews>({
      query: (review) => ({
        url: "/reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Review"],
    }),
    updateReview: builder.mutation<void, Reviews>({
      query: (updatedReview) => ({
        url: `/reviews/${updatedReview.id}`,
        method: "PUT",
        body: updatedReview,
      }),
      invalidatesTags: ["Review"],
    }),
    deleteReview: builder.mutation<void, Reviews>({
      query: (review) => ({
        url: `/reviews/${review.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useReviewsQuery,
  useReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = ReviewsApi;
