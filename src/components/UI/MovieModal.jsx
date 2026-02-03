const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header px-3">
              <div className="text-center w-100">
                <h6 className="mb-0">{movie.Title}</h6>
                <small className="text-muted">{movie.Year}</small>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div
                className="d-flex flex-column flex-md-row gap-3"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/300x350?text=No+Image"
                  }
                  alt={movie.Title}
                  className="mx-3 me-lg-5 me-md-3 mb-3 mb-lg-0 mb-md-0"
                  style={{
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />

                <div className="pe-5">
                  <p>
                    <strong>Plot:</strong>
                    <br />
                    {movie.Plot || "No plot available"}
                  </p>
                  <p>
                    <strong>Actors:</strong>
                    <br />
                    {movie.Actors || "No actors available"}
                  </p>
                  <p>
                    <strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
              <a
                href={`https://imdb.com/title/${movie.imdbID}`}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                IMDb
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
};

export default MovieModal;
