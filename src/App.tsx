import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import MovieSeries from "./pages/MovieSeries";
import MovieSeriesDetails from "./pages/MovieSeriesDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import "./App.css";

const App = () => (
    <div className="d-flex flex-column min-vh-100">
        <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: "16px" } }} />
        <Navbar />
        <main className="flex-grow-1">
            <Routes>
                <Route path="/" element={<MovieSeries />} />
                <Route path="/details/:id" element={<MovieSeriesDetails />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
    </div>
);

export default App;