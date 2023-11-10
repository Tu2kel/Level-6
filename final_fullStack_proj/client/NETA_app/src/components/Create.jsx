import React, { useContext, useEffect } from "react";
import ReviewForm from "./ReviewForm"; 
import ReviewList from "./ReviewList";
import { UserContext } from "../context/UserProvider";
import '../App.css'

export default function Profile(props) {
  const { //grab from UserContext in UserProvider
    user: { username },
    addReview,
    reviews,
    getUserReviews
   
  } = useContext(UserContext);

  
  useEffect(() => {// Saves reviews to localStorage whenever they change
    getUserReviews();
  }, []);
  
  // console.log("in Profile line 21", 'Name:', username, 'review:', reviews);
  
  // console.log('Profile comp, reviews:', reviews)
  return (
    <> 
      <h1 className="reviewTitle">Welcome {username}!</h1>
      
      <h3 className="h3_review" >Create a Review</h3>
      <ReviewForm addReview={addReview} />{" "}

      {/*renders the ReviewForm component and pass the addReview function as a prop*/}

      <h3 className="review_List_para" >Your Review(s) Posted Below</h3>
      <ReviewList reviews={reviews} />{" "}

      
      {/* renders the ReviewList component and pass the user's reviews as a prop. */}
    
    </>
  );
}
