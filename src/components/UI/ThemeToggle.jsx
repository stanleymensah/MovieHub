import useTheme from "../../hooks/useTheme";
import "./ThemeToggle.scss";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? (
        <i className="bi bi-brightness-high-fill"></i>
      ) : (
        <i className="bi bi-moon-fill"></i>
      )}
    </button>
  );
}

