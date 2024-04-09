import { Routes, Route, NavLink } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import "./assets/css/style.scss"; // can import scss directly to js but not to html
import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "./layout/Main";
import ViewPost from "./layout/ViewPost";

function App() {
  const mainMenu = [
    { name: "홈으로", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "제품소개", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "온라인문의", url: "#" },
    { name: "커뮤니티", url: "/posts/1" },
  ]; // static thus don't need useState

  const [userData, setUserData] = useState([]);
  //  initially userData is set to [] so on initial render
  // userData = [] is passed to ViewPost child component as props
  // thus theres nothing in userData which is why it gives cannot find title error in Viewpost.
  // useEffect dependency list is empty thus useEffect will only execute on initial re-render and not on
  // subsequent re renders due to state update, so when axios finishes and sets userData to response.data
  // the state updates => as state updates it re-renders App() except useEffect(empty dependency list so only renders on initial render)
  // so the ViewPost child component will now be rendered, now with userData=[response.data] passed in as props
  // so now it can find props.listData.title or .body etc correctly in ViewPost child.
  // to prevent error when userData=[] is initially passed in as props to ViewPost on initial render of App,
  // we add if (props.listData.length === 0) {return "자료가 없음";} inside ViewPost so on initial render of ViewPost it will return "자료가 없음"
  // then after axios finish => userData state change => App re-render except useEffect and thus on second render of ViewPost
  // it will now correctly return matchedData.title and matchedData.body etc inside ViewPost.

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function test() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
        );
        setTimeout(() => {
          setLoading(false);
        }, 800);
        setUserData(response.data);
      } catch (error) {
        setTimeout(() => {
          setLoading(false); // why put this here if axios gave error??
        }, 800);
        console.error(error);
      }
    }
    test();
  }, []); // empty dependency list => only renders once on initial render of App
  // but bc of empty dependency list useEffect won't re-render on subsequent re-renders of App such as due to state change
  // if no dependency list given at all, useEffect will also re-render on each and every re-render of App thus we wnat to provide empty dependency list to prevent this.

  return (
    <>
      <div className="header">
        <div className="container">
          <h1>
            logo {/* fontSize OR "font-size" for JS */}
            <span style={{ color: "blue", fontSize: "2em" }}>
              <SlCursor />
            </span>
          </h1>
          <nav>
            <ul>
              {mainMenu.map((item, i) => {
                return (
                  // key must be unique
                  <li key={i}>
                    {/* a tag goes to top screen and to # link so we use NavLink instead */}
                    <NavLink to={item.url}>{item.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div>
            <ul className="icons">
              <li>
                <FaReact />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Main listData={userData} />} />
          <Route path="/posts/:id" element={<ViewPost listData={userData} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
