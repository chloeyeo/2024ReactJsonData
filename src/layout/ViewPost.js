import React from "react";
import { useParams } from "react-router-dom";

const ViewPost = ({ postData, userData }) => {
  const { id } = useParams();
  const postId = parseInt(id, 10); // same as just parseInt(id)
  const matchedPost = postData.find((item) => {
    return item.id === postId;
  });
  if (!matchedPost) {
    return "matched post does not exist";
  }
  const matchedUser = userData.find((item) => {
    return item.id === matchedPost.userId;
  });
  if (!matchedUser) {
    return "matched user does not exist";
  }
  return (
    <div>
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
