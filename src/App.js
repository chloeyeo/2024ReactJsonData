import { Routes, Route, NavLink } from "react-router-dom";
import React from "react";

function App() {
  const mainMenu = [
    { name: "회사소개", url: "#" },
    { name: "제품소개", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "온라인문의", url: "#" },
    { name: "커뮤니티", url: "#" },
  ]; // static thus don't need useState
  return (
    <>
      <div className="header">
        <div className="container">
          <h1>logo</h1>
          <nav>
            <ul>
              {mainMenu.map((item, i) => {
                return (
                  // key must be unique
                  <li key={i}>
                    <a href={item.url}>{item.name}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
}

export default App;
