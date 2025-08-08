import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getMS, getDetailsMS } from "../api/movieseries";

const useMovieSeries = (filters) => {

    const [mS, setMS] = useState([]);
    const [nextToWatch, setNextToWatch] = useState(null);
    const [msDetails, setMSDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetMS = async () => {
        try {
            setLoading(true);
            const response = await getMS(filters);
            setMS(response.data);
            const unwatched = Object.values(response.data).flat().filter(m => !m.msWatched);
            const random = unwatched.length ? unwatched[Math.floor(Math.random() * unwatched.length)] : null;
            setNextToWatch(random);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series.");
        } finally {
            setLoading(false);
        };
    };

    const handleGetDetailsMS = async (id) => {
        try {
            setLoading(true);
            const response = await getDetailsMS(id);
            setMSDetails(response.data);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series details.");
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        if (!filters || Object.keys(filters).length === 0) return;
        handleGetMS();
    }, [filters]);

    return { mS, nextToWatch, loading, msDetails, handleGetDetailsMS };
};

export default useMovieSeries;