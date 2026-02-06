import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./RootLayout.scss";

export default function RootLayout({ onInput, onSubmit }) {
  return (
    <div className="root-layout">
      <Header onInput={onInput} onSubmit={onSubmit} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
