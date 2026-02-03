const MoviePagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="my-4">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 && "disabled"}`}>
          <button className="page-link" onClick={() => onChange(page - 1)}>
            Prev
          </button>
        </li>

        <li className="page-item active">
          <span className="page-link">{page}/{totalPages}</span>
        </li>

        <li className={`page-item ${page === totalPages && "disabled"}`}>
          <button className="page-link" onClick={() => onChange(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default MoviePagination;
