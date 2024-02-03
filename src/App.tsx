import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  useReviewsQuery,
  useReviewQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from "./services/ReviewApi";

function App() {
  const { data, error, isLoading, isSuccess } = useReviewsQuery();
  return (
    <div className="App">
      <h1>RTK query</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map((review) => {
            return (
              <div key={review.id}>
                <span>{review.comment}</span>
                <span>
                  <Review id={review.id} />
                </span>
              </div>  
            );
          })}
        </div>
      )}
      <div>
        <AddReview />
      </div>
    </div>
  );
}

export const Review = ({ id }: { id:  number }) => {
  const { data } = useReviewQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

export const AddReview = () => {
  const [addReview] = useAddReviewMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const review = {
    id: 6,
    rating: 3,
    comment: "Review 1 for product id 6",
    productId: 1,
  };
  const updatedReview = {
    id: 1,
    rating: 3,
    comment: "updated one",
    productId: 1,
  };
   const reviewId = {
    id: 6,
    rating: 3,
    comment: "Review 1 for product id 6",
    productId: 1,
  };
  const addHandler = async () => {
    await addReview(review);
  };

  const updateHandler = async () => {
    await updateReview(updatedReview);
  };

  const deleteHandler = async () => {
    await deleteReview(reviewId);
  };

  return (
    <>
      <button onClick={addHandler}>Add Review</button>
      <button onClick={updateHandler}>update Review</button>
      <button onClick={deleteHandler}>Delete Review</button>
    </>
  );
};

export default App;
