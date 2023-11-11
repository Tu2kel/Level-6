import React from "react";
import Review from "./Review";

//Parent

export default function ReviewList(props) {
  const { reviews } = props; //destructure reviews
  // console.log('reviewList reviews:',reviews)
  return (
    <div className="review_list">

      {

      reviews?.map((review) => ( //map over reviews arr and renders

        <Review //passes the key and reviewData props to the review Comp
          key={review._id} //
          {...review}
          reviewData={review} //allows review to display
        />
      ))}
    </div>
  );
}
