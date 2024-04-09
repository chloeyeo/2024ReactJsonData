import React from "react";
import { useParams } from "react-router-dom";

const ViewPost = (props) => {
  const { id } = useParams();
  if (props.listData.length === 0) {
    return "자료가 없음";
  }
  const postId = parseInt(id, 10); // same as just parseInt(id)
  return <div>{props.listData[postId].title}</div>;
};

export default ViewPost;
