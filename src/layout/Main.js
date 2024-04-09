import React from "react";

const Main = ({ listData }) => {
  return (
    <div>
      <h3 className="container mx-auto bg-jacarta-100 rounded-md p-4 mb-4">
        <h1 className="text-2xl font-bold">Blog List</h1>
      </h3>
      <hr />
      <ul className="p-4">
        <li
          key="title"
          className="mt-2 bg-jacarta-50 rounded-md text-lg font-semibold"
        >
          Titles
        </li>
        {listData.map((item, i) => {
          return (
            <li key={i} className="mt-2 bg-jacarta-50 rounded-md">
              <h4 className="text-md font-semibold">
                {i}: {item.title}
              </h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
