import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import ReviewList from "./ReviewList";

export default function Public(props) {
  const { publicReview, getAllReviews } = useContext(UserContext);

  useEffect( () => {
    getAllReviews() // adding all reviews on public page
  }, [])

  return (
    <div className="public">
      <header className="review_page" >
        {" "}
        <strong> Public Reviews Section </strong>{" "}
      </header>
      <br />
      <ReviewList reviews={publicReview} />{" "}
      {/* render ReviewList + pass the publicReviews  */}
    </div>
  );
}

