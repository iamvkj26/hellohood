import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import MovieSeries from "./pages/MovieSeries";
import MovieSeriesDetails from "./pages/MovieSeriesDetails";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Toaster position="top-right" toastOptions={{ duration: 3000, style: { fontSize: "16px" } }} />
                <Navbar />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<MovieSeries />} />
                        <Route path="/details/:id" element={<MovieSeriesDetails />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default App;