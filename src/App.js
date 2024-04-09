import { Routes, Route, NavLink } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import "./assets/css/style.scss"; // can import scss directly to js but not to html
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const mainMenu = [
    { name: "홈으로", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "제품소개", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "온라인문의", url: "#" },
    { name: "커뮤니티", url: "#" },
  ]; // static thus don't need useState

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      // what comes after ? is a query string! to search for exact things
      // params != query
      // url: https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10
      // params = page
      // query string: _page=1&_limit=10 (<-so that we can use find() to find data according to these queries)
      // & separates the queries
      // <input type="text" name-"_page"> => get method (shows_page where as post method hides _page in url)
      .get("https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10")
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData]);

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
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
}

export default App;
