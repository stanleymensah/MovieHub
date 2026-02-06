import { useEffect, useState } from "react";

const KEY = "theme";

export default function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(KEY) || "light",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
