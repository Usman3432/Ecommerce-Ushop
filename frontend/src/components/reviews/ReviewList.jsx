import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <div className="reviews w-75">
      <h3>Other's Reviews:</h3>
      <hr />
      {reviews?.map((review) => (
        <div key={review?._id} className="review-card my-3">
          <div className="row">
            <div className="col-1">
              <img
                src={review?.user?.avatar ? review?.user?.avatar?.url : "/images/default_avatar.jpg"}
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle"
              />
            </div>
            <div className="col-11">
              <div className="star-ratings">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className="fa fa-star"
                    style={{
                      color: index < (review?.rating || 0) ? "#ffc107" : "#e0e0e0",
                      fontSize: "16px",
                    }}
                  ></i>
                ))}
              </div>
              <p className="review_user">by {review?.user?.name}</p>
              <p className="review_comment">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
