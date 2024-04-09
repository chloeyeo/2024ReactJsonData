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
  const arrayOfPageNumbers = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

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

      {/* pagination buttons:
      1. {Array.from({ length: totalPages }, (_, index) => index + 1) creates an
      array of length 'totalPages' filled with numbers from 1 to 'totalPages'.
      
      2. The (_index)=>index+1 function maps each index of the array to its
      corresponding page number, adding 1 because page numbers typically start
      from 1, not 0.

      3. (_, index) => index + 1) is same as (_, index) => { return index + 1; })

      4. .map((pageNumber) => ...) this map function maps each page number to a
      button element. Each button has a key attribute set to make each button unique.
      The onclick eventHandler updates the currentPage state to the clicked page number
      when the button is clicked. The button's label displays the page number.
      */}

      {/* {Array.from({ length: totalPages }, (_, index) => index + 1) Explanation:
      1. Array.from() is a static method on the Array object in JavaScript.
      Array.from() creates a new array instance From an array-like or iterable object.
      Here, we use Array.from() to create an array of page numbers based on the total
      number of pages (totalPages).
      2. second argument: (_, index) => index + 1) is a mapping function that defines
      how each element of the resulting array will be computed.
      The '_' parameter is a placeholder for the current element being processed.
      We don't need to use this here so we replaced it with _.
      => index+1 means the function returns index+1. Thus for each current element
      i.e. for each page, returns its index+1, i.e. it increments the index by 1
      to generate page numbers starting from 1.
      3. { length: totalPages } creates an object with a single property length,
      where the value of length is totalPages. When Array.from() is provided with
      an object having a length property, it creates an array with the specified length.
      */}
      <div>
        {arrayOfPageNumbers.map((pageNumber) => (
          <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AllPostsPagination;
