import React from "react";
import { useState } from "react";

function AllPostsPagination({ allPosts, allUsers }) {
  const itemsPerPage = 3; // number of posts (and thus their users also) shown per page
  const [currentPage, setCurrentPage] = useState(1); // keeps track of current page number.
  // totalPages = total number of pages needed to display all posts.
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);
  const paginatedPosts = allPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {paginatedPosts.map((post) => {
          const matchedUser = allUsers.find((user) => user.id === post.userId);
          return (
            <li key={post.id}>
              <h3>{post.title}</h3>
              {matchedUser && (
                <div>
                  <h5>{matchedUser.name}</h5>
                  <p>
                    Address - street: {matchedUser.address.street}, city:{" "}
                    {matchedUser.address.city}
                  </p>
                </div>
              )}
              <p>{post.body}</p>
            </li>
          );
        })}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default AllPostsPagination;
