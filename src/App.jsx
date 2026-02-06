import { useEffect, useState, useCallback } from "react";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDebounce from "./hooks/UseDebounce";

const API_KEY = "71fa5d10";
const DEFAULT_QUERY = "Movie";

const App = () => {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = useCallback(async (q, p = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${p}&type=movie`,
      );
      const data = await res.json();
      // console.log(data);

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
        setError(data.Error);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchMovies(query, 1);
  }, [fetchMovies, query]);

  const debouncedInput = useDebounce(input, 500);

  useEffect(() => {
    if (!debouncedInput.trim()) {
      setQuery(DEFAULT_QUERY);
      setPage(1);
      fetchMovies(DEFAULT_QUERY, 1);
      return;
    }

    setQuery(debouncedInput);
    setPage(1);
    fetchMovies(debouncedInput, 1);
  }, [debouncedInput, fetchMovies]);

  const handleInput = (value) => {
    setInput(value);
  };

  const handleSubmit = (q) => {
    if (!q) return;
    setInput(q);
    setQuery(q);
    setPage(1);
    fetchMovies(q, 1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    fetchMovies(query, p);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout onInput={handleInput} onSubmit={handleSubmit} />}
      >
        <Route
          index
          element={
            <Home
              movies={movies}
              loading={loading}
              error={error}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          }
        />
        <Route path="wishlist" element={<WishList searchInput={input} />} />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default App;
