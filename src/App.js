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

  useEffect(() => {
    async function test() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    test();
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
        <Route path="/" element={<Main listData={userData} />} />
        <Route path="/posts/:id" element={<ViewPost listData={userData} />} />
      </Routes>
    </>
  );
}

export default App;
