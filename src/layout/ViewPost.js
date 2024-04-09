import React from "react";
import { useParams } from "react-router-dom";

const ViewPost = ({ postData, userData }) => {
  const { id } = useParams();
  const postId = parseInt(id, 10); // same as just parseInt(id)
  const matchedPost = postData.find((item) => {
    return item.id === postId;
  });
  if (!matchedPost) {
    return (
      <div className="container mx-auto bg-jacarta-100 rounded-md p-4">
        Matched post does not exist
      </div>
    );
  }
  const matchedUser = userData.find((item) => {
    return item.id === matchedPost.userId;
  });
  if (!matchedUser) {
    return (
      <div className="container mx-auto bg-jacarta-100 rounded-md p-4">
        Matched user does not exist
      </div>
    );
  }
  return (
    <div className="container mx-auto bg-jacarta-100 rounded-md p-4">
      <h3>{matchedPost.title}</h3>
      <h5>{matchedUser.name}</h5>
      <p>
        Address - street:{matchedUser.address.street}, city:
        {matchedUser.address.city}
      </p>
      <hr />
      <p>{matchedPost.body}</p>
    </div>
  );
};

export default ViewPost;
