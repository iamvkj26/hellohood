import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getMovieSeries } from "../api/movieseries";

const useMovieSeries = (filters) => {

    const [movieSeries, setMovieSeries] = useState([]);
    const [nextToWatch, setNextToWatch] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetMovieSeries = async () => {
        try {
            setLoading(true);
            const response = await getMovieSeries(filters);
            setMovieSeries(response.data);
            const unwatched = Object.values(response.data).flat().filter(m => !m.msWatched);
            const random = unwatched.length ? unwatched[Math.floor(Math.random() * unwatched.length)] : null;
            setNextToWatch(random);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series.");
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        if (!filters || Object.keys(filters).length === 0) return;
        handleGetMovieSeries();
    }, [filters]);

    return { movieSeries, nextToWatch, loading, handleGetMovieSeries };
};

export default useMovieSeries;