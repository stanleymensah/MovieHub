import { useState, useMemo } from "react";
import {
  getWishlist,
  removeFromWishlist,
} from "../components/UI/AddToWishlish";
import { toast } from "react-toastify";
import ScrollToTop from "../components/UI/ScrollToTop";

export default function WishList({ searchInput = "" }) {
  const [wishlist, setWishlist] = useState(getWishlist());

  const filteredWishlist = useMemo(() => {
    if (!searchInput.trim()) return wishlist;
    return wishlist.filter((movie) =>
      movie.Title.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [wishlist, searchInput]);

  function handleRemove(id) {
    removeFromWishlist(id);
    setWishlist(getWishlist());
    toast("Removed from wishlist!", {
      style: {
        background: "#fa374b",
        color: "#fff",
      },
    });
  }

  if (!wishlist.length) {
    return <p className="text-center mt-5">No movies in wishlist yet.</p>;
  }

  if (!filteredWishlist.length) {
    return <p className="text-center mt-5">No movies match your search.</p>;
  }

  return (
    <div className="container">
      <h3 className="mb-4">Your Wishlist</h3>

      <div className="list-group">
        {filteredWishlist.map((movie, index) => (
          <div
            key={index}
            className="list-group-item d-flex align-items-center justify-content-between py-3"
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/50x75?text=No+Image"
              }
              className="me-3"
              style={{ width: "50px", height: "75px", objectFit: "cover" }}
              alt={movie.Title}
            />

            <div className="flex-grow-1">
              <h6 className="mb-1">{movie.Title}</h6>
            </div>

            <button
              className="btn btn-sm btn-outline-danger ms-3"
              onClick={() => handleRemove(movie.imdbID)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <ScrollToTop />
    </div>
  );
}
