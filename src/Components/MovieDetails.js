import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState({}); // State to store movie data
  const [cast, setCast] = useState([]); // State to store
  const movie_id = searchParams.get("query"); // Get the movie ID from the query parameter
  console.log(movie_id + " this is a movie id from movie details"); // Debugging

  const Api_key = "c45a857c193f6302f2b5061c3b85e743"; // Replace with your actual API key

  // Fetch movie details using the movie_id
  const fetchMovie = async (movie_id) => {
    if (!movie_id) {
      console.error("No movie ID provided.");
      return;
    }

    try {
      let result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
      );
      setMovie(result.data); // Store the fetched movie data
    } catch (e) {
      console.error("Error fetching movie data:", e); // Error handling
    }
  };

  //cast
  const fetchMovieCast = async () => {
    try {
      let result = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
      );
      console.log(result.data.cast);
      setCast(result.data.cast); // Store the fetched movie data
    } catch (e) {
      console.log(e.message);
    }
  };

  // Fetch movie data when movie_id changes
  useEffect(() => {
    if (movie_id) {
      fetchMovie(movie_id);
      fetchMovieCast();
    }
  }, [movie_id]); // Dependency on movie_id ensures fetch happens when it changes

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-6">
          <div className="row">
            <div className="col-xl-3">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid"
              />
            </div>
            <div className="col-xl-9">
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <p>Runtime: {movie.runtime} minutes</p>
              <p>
                Genres:{" "}
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre, index) => (
                      <span key={genre.id}>
                        {genre.name}
                        {index < movie.genres.length - 1 && ", "}
                      </span>
                    ))
                  : "N/A"}
              </p>
            </div>
          </div>
          <p>Release Date: {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>

      <div className="row"></div>
      <h2>Movie Cast</h2>
      <div className="row">
        {cast &&
          cast.length > 0 &&
          cast.map((cast) => {
            return (
              <div className="col-xl-2">
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt="{cast.name}"
                  className="img-fluid"
                />
                <p>
                  <strong>{cast.name}</strong>
                </p>
                <p>Character:{cast.character}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
// https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US
