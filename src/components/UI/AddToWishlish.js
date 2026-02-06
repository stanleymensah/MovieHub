const KEY = "wishlist";

export function getWishlist() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function addToWishlist(movie) {
  const wishlist = getWishlist();
  // console.log(wishlist)

  // console.log(movie.imdbID)
  if (!wishlist.find((m) => m.imdbID === movie.imdbID)) {
    wishlist.push(movie);
    localStorage.setItem(KEY, JSON.stringify(wishlist));
    // console.log(wishlist)
  }
}

export function removeFromWishlist(id) {
  const wishlist = getWishlist().filter((m) => m.imdbID !== id);
  localStorage.setItem(KEY, JSON.stringify(wishlist));
}

export function isInWishlist(id) {
  const wishlist = getWishlist();
  return wishlist.some((m) => m.imdbID === id);
}