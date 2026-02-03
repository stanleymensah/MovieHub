const Header = ({ onInput, onSubmit }) => (
  <header
    className="bg-dark text-white py-4 w-100"
    style={{ position: "fixed", top: 0, zIndex: 1030 }}
  >
    <div className="container d-flex flex-column flex-sm-row gap-3 justify-content-between">
      <h1 className="w-100">Movie Hub</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.target.search.value);
        }}
        className="d-flex gap-2 w-100 w-sm-auto"
      >
        <input
          name="search"
          className="form-control w-100"
          placeholder="Search movies..."
          onChange={(e) => onInput(e.target.value)}
          autoFocus
        />
        <button className="btn btn-primary">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </div>
  </header>
);

export default Header;
