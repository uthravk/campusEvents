import { Link, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/common/Navbar/Navbar";
import { Footer } from "./components/common/Footer/Footer";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import EventDetails from "./pages/EventDetails/EventDetails";
import Register from "./pages/Register/Register";
import "./App.css";

export default function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <main className="page-shell">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>
      <Footer />
    </FavoritesProvider>
  );
}
