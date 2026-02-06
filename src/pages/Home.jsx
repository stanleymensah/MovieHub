import MovieGrid from "../components/Movies/MovieGrid"
import ScrollToTop from "../components/UI/ScrollToTop"

export default function Home({ movies, loading, error, page, totalPages, onPageChange }) {
  return (
    <div className="home">
      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <ScrollToTop />
    </div>
  )
}
