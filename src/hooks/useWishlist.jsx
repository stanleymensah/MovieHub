import { useState, useCallback } from "react";

const KEY = "wishlist";

function getStoredWishlist() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export default function useWishlist() {
  const [wishlist, setWishlist] = useState(getStoredWishlist);

  const addToWishlist = useCallback((movie) => {
    setWishlist((prev) => {
      if (prev.some((m) => m.imdbID === movie.imdbID)) return prev;

      const updated = [...prev, movie];
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => {
      const updated = prev.filter((m) => m.imdbID !== id);
      localStorage.setItem(KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWishlist = useCallback(
    (id) => wishlist.some((m) => m.imdbID === id),
    [wishlist],
  );

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
}
