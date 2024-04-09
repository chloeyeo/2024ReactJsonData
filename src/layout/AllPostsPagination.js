import React from "react";
import { useState } from "react";

function AllPostsPagination({ allPosts, allUsers }) {
  const postsPerPage = 3; // number of posts (and thus their users also) shown per page
  const [currentPage, setCurrentPage] = useState(1); // keeps track of current page number.
  // totalPages = total number of pages needed to display all posts.
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  // paginatedPosts = posts to display on the current page.
  // pagnatedPosts uses the 'slice' method to extract a portion of the 'allPosts' array
  // corresponding to the current page.
  // The calculation of startIndex and endIndex ensures that each page
  // displays the correct subset of posts.
  // JS array slice() method is startIndex INCLUSIVE and endIndex EXCLUSIVE
  // e.g. slice(1,4) returns items at indices 1, 2, and 3 but not 4.
  // array.slice() method is used to extract a section of given array.
  const startIndex = (currentPage - 1) * postsPerPage;
  /* explanation of startIndex calculation:
  1. (currentPage - 1) adjusts the page number to a zero-based index.
  E.g. if currentPage is 1, (i-1) evaluates to 0, indicating that the
  first page starts at index 0.
  2. multiplying by postsPerPage: this determines how many posts to skip ahead
  to reach the start of the current page. E.g. if postsPerPage is 3, multiplying
  the zero-based index by 3 ensures that the first page starts at index 0,
  the second page starts at index 3, and so on!
  */
  const endIndex = currentPage * postsPerPage;
  /* explanation of endIndex calculation:
  endIndex is the index immediately After the last post to display on the current page.
  1. currentPage is the current page number.
  2. multiplying by postsPerPage: this determines how many posts to include in the
  current page. E.g. if currentPage is 1 and postsPerPage is 3, then 1*3 is 3,
  indicating that the firstPage will include posts from index 0 to 2 (includive),
  (i.e. index 0,1,2) covering 3 items.
  */
  const paginatedPosts = allPosts.slice(startIndex, endIndex);

  //   pagination buttons range set:
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);

  const paginationButtons = [];

  //render pagination buttons if they fall in range
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }

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

      {/* pagination buttons: */}
      <div>
        {/* render prev button if current page not first page */}
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        )}

        {/* render pagination buttons */}
        {paginationButtons}

        {/* render next button if current page not final page */}
        {currentPage < totalPages && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default AllPostsPagination;
