import { useState } from "react";
import MovieModal from "../UI/MovieModal";

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=71fa5d10&t=${movie.Title}&plot=full`,
      );
      const data = await response.json();
      // console.log(data);
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setOpen(true);
    }
  };

  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4" style={{height: "400px"}}>
        <div
          className="card text-white border-0 h-100"
          // onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
          onClick={fetchMovieDetails}
        >
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/300x450?text=No+Image"
            }
            className="card-img"
            alt={movie.Title}
            style={{ objectFit: "cover", height: "100%" }}
          />

          <div className="card-img-overlay d-flex flex-column justify-content-end bg-dark bg-opacity-50">
            <h6 className="card-title mb-1">{movie.Title}</h6>
            <small className="text-light">{movie.Year}</small>

            <button
              className="btn btn-sm btn-primary mt-2"
              
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {open && (
        <MovieModal movie={movieDetails} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default MovieCard;
