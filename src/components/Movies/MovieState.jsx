import Loader from "../UI/Loader";
import AlertMessage from "../UI/AlertMessage";

const MovieState = ({ loading, error, empty }) => {
  if (loading) return <Loader />;
  if (error) return <AlertMessage text={error} />;
  if (empty)
    return (
      <div className="text-center text-muted my-5">
        <i className="bi bi-film fs-1"></i>
        <p>No movies yet</p>
      </div>
    );
  return null;
};

export default MovieState;
