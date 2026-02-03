import MovieCard from "./MovieCard";
import MoviePagination from "./MoviePagination";
import MovieState from "./MovieState";

const MovieGrid = ({ movies, loading, error, page, totalPages, onPageChange }) => {
  return (
    <main className="container" style={{marginTop: "120px"}}>
      <MoviePagination
        page={page}
        totalPages={totalPages}
        onChange={onPageChange}
      />
      <MovieState loading={loading} error={error} empty={!movies.length} />

      <div className="row">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>

      <MoviePagination
        page={page}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </main>
  );
};

export default MovieGrid;
