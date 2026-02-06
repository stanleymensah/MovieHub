import { useState } from "react";
import MovieModal from "../UI/MovieModal";
import {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "../UI/AddToWishlish";
import { toast } from "react-toastify";
import axios from "axios";

const MovieCard = ({ movie }) => {
  const [open, setOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [saved, setSaved] = useState(isInWishlist(movie.imdbID));

  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=71fa5d10&t=${movie.Title}&plot=full`,
      );
      const data = response.data;
      // console.log(data);
      setMovieDetails(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setOpen(true);
    }
  };

  function toggleWishlist() {
    if (saved) {
      removeFromWishlist(movie.imdbID);
      toast("Removed from wishlist!", {
        style: {
          background: "#fa374b",
          color: "#fff",
        },
      });
    } else {
      addToWishlist(movie);
      toast("Added to wishlist!", {
        style: {
          background: "#1ddf85",
          color: "#fff",
        },
      });
    }
    setSaved(!saved);
  }

  return (
    <>
      <div
        className="col-12 col-md-6 col-lg-3 mb-4"
        style={{ height: "400px" }}
      >
        <div
          className="card text-white border-0 h-100"
          style={{ cursor: "pointer" }}
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

            <div className="d-flex flex-column flex-md-row">
              <button
                className="btn btn-sm btn-primary mt-2 w-100"
                onClick={fetchMovieDetails}
              >
                View Details
              </button>
              <button
                className="btn btn-sm btn-outline-light mt-2 ms-md-2 w-100"
                onClick={toggleWishlist}
              >
                {saved ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
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
