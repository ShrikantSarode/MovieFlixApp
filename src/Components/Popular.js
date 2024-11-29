import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // Use page for pagination
  const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination
  const navigate = useNavigate();

  const Api_key = "c45a857c193f6302f2b5061c3b85e743"; // Replace with your actual API key

  const fetchPopularMovies = (page) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Api_key}&language=en-US&page=${page}`
      )
      .then((response) => {
        console.log(response.data.results);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); // Set total pages from the response
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]); // Re-fetch when the page changes

  // Functions for handling pagination
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Go to the previous page
      window.scroll(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Go to the next page
      window.scroll(0, 0);
    }
  };

  const handleMovie = (id) => {
    console.log(id);
    navigate(`/movie?query=${id}`);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center">Popular Movies</h1>
        <div className="row mb-3 mt-3">
          {movies.length > 0 ? (
            movies.map((movie) => {
              return (
                <div
                  className="col-xl-3"
                  key={movie.id}
                  onClick={() => handleMovie(movie.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="img-fluid card"
                  />
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                </div>
              );
            })
          ) : (
            <p>Loading movies...</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="pagination d-flex justify-content-center">
          <button
            className="btn btn-danger mr-5  mb-5 btn1"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-danger ml-5  mb-5 btn1"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Popular;

// return (
//   <div className="container ">
//     <div className="row">
//       {movies &&
//         movies.length > 0 &&
//         movies.map((movie) => {
//           return (
//             <div className="col-xl-3 " key={movie.id}>
//               <img
//                 src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 className="img-fluid card"
//               />
//               <h3>{movie.title}</h3>
//               <p>{movie.overview}</p>{" "}
//               {/* You might want to show an overview or a description of the movie */}
//             </div>
//           );
//         })}
//     </div>
//   </div>
// );
