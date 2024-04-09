import React from "react";
import { useParams } from "react-router-dom";

const ViewPost = (props) => {
  const { id } = useParams();
  if (props.listData.length === 0) {
    return "자료가 없음";
  }
  const postId = parseInt(id, 10); // same as just parseInt(id)
  const matchedData = props.listData.find((item) => {
    // console.log(typeof item.id); // number
    // console.log(typeof postId); //number
    // console.log("postId", postId, "listId", item.id);
    // id 0 does not exist!!
    return item.id === postId;
  });
  return (
    <div>
      <h3>{matchedData.title}</h3>
      <hr />
      <p>{matchedData.body}</p>
      {/* <h3>{props.listData[postId].title}</h3>
      <hr />
      <p>{props.listData[postId].body}</p> */}
    </div>
  );
};

export default ViewPost;
