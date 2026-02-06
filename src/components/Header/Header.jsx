import { Link } from "react-router-dom";
import ThemeToggle from "../UI/ThemeToggle";
import "./Header.scss";

const Header = ({ onInput, onSubmit }) => (
  <header className="header-wrapper">
    <div className="container-fluid">
      <nav className="navbar-custom">
        {/* Logo and Links */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-brand-link">
            <h1 className="navbar-title">Movie Hub</h1>
          </Link>

          <Link to="wishlist" className="nav-link">
            <i className="bi bi-heart"></i>
            <span className="nav-text">My Wishlist</span>
          </Link>
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(e.target.search.value);
          }}
          className="search-form"
        >
          <div className="search-container">
            <input
              name="search"
              className="search-input"
              placeholder="Search movies..."
              onChange={(e) => onInput(e.target.value)}
              autoFocus
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>

        {/* Theme Toggle */}
        <div className="theme-toggle-wrapper">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
