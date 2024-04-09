import { Routes, Route, NavLink } from "react-router-dom";
import { FaReact } from "react-icons/fa";
import { SlCursor } from "react-icons/sl";
import "./assets/css/style.scss"; // can import scss directly to js but not to html
import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "./layout/Main";
import ViewPost from "./layout/ViewPost";
import AllPostsPagination from "./layout/AllPostsPagination";

function App() {
  const mainMenu = [
    { name: "홈으로", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "제품소개", url: "#" },
    { name: "회사소개", url: "#" },
    { name: "온라인문의", url: "#" },
    { name: "커뮤니티", url: "/posts/" },
  ];
  const [postData, setPostData] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  const [allPostsLoading, setAllPostsLoading] = useState(true);
  const [allUsersLoading, setAllUsersLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [postResponse, userResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts"),
          axios.get("https://jsonplaceholder.typicode.com/users"),
        ]);
        setAllPosts(postResponse.data);
        setAllUsers(userResponse.data);
        setTimeout(() => {
          setAllPostsLoading(false);
          setAllUsersLoading(false);
        }, 800);
      } catch (error) {
        setTimeout(() => {
          setAllPostsLoading(false);
          setAllUsersLoading(false);
        }, 800);
        console.error(error);
      }
    }

    fetchAllData();
  }, []);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10"
        );
        setPostData(response.data);
        setTimeout(() => {
          setPostLoading(false);
        }, 800);
        getUsers();
      } catch (error) {
        setTimeout(() => {
          setPostLoading(false); // why put this here if axios gave error??
        }, 800);
        console.error(error);
      }
    }

    async function getUsers() {
      try {
        const newUserData = [...userData];
        await Promise.all(
          postData.map(async (post) => {
            const response = await axios.get(
              `https://jsonplaceholder.typicode.com/users/${post.userId}`
            );
            const user = response.data;
            // The findIndex() method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
            const existingUserIndex = newUserData.findIndex(
              (u) => u.id === user.id
            );
            if (existingUserIndex === -1) {
              newUserData.push(user);
            }
          })
        );
        setUserData(newUserData);
        setTimeout(() => {
          setUserLoading(false);
        }, 800);
      } catch (error) {
        setTimeout(() => {
          setUserLoading(false);
        }, 800);
        console.error(error);
      }
    }
    getPosts();
  }, [postData, userData]);

  return (
    <>
      <div className="header">
        <div className="container">
          <h1>
            logo
            <span style={{ color: "blue", fontSize: "2em" }}>
              <SlCursor />
            </span>
          </h1>
          <nav>
            <ul>
              {mainMenu.map((item, i) => {
                return (
                  <li key={i}>
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
      {allPostsLoading || allUsersLoading || postLoading || userLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route path="/" element={<Main listData={postData} />} />
          <Route
            path="/posts"
            element={
              <AllPostsPagination allPosts={allPosts} allUsers={allUsers} />
            }
          />
          <Route
            path="/posts/:id"
            element={<ViewPost postData={postData} userData={userData} />}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
