import { useEffect, useState, useCallback, StrictMode } from "react";
import Header from "./components/Header/Header";
import MovieGrid from "./components/Movies/MovieGrid";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/UI/ScrollToTop";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

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
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${q}&page=${p}&type=movie`
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
  }, []);

  // debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        setQuery(input);
        setPage(1);
        fetchMovies(input, 1);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [input]);

  const handlePageChange = (p) => {
    setPage(p);
    fetchMovies(query, p);
  };

  return (
    <>
      <Header onInput={setInput} onSubmit={setInput} />
      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default App;
