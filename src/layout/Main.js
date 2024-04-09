import React from "react";

const Main = ({ listData }) => {
  return (
    <div>
      <h3>blogList</h3>
      <hr />
      <ul>
        {listData.map((item, i) => {
          return <li key={i}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default Main;
