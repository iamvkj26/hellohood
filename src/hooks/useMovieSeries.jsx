import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getMS, getDetailsMS, getAboutUs } from "../api/movieseries";

const useMovieSeries = (filters) => {

    const [mS, setMS] = useState([]);
    const [nextToWatch, setNextToWatch] = useState(null);
    const [msDetails, setMSDetails] = useState(null);
    const [aboutUs, setAboutUs] = useState({});
    const [loading, setLoading] = useState(true);

    const handleGetMS = async () => {
        try {
            setLoading(true);
            const fakeData = {
                2025: new Array(4).fill({}),
                2010: new Array(3).fill({}),
                2000: new Array(2).fill({}),
                1985: new Array(1).fill({})
            };
            setMS(fakeData);
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

    const handleAboutUs = async () => {
        try {
            setLoading(true);
            const response = await getAboutUs();
            setAboutUs(response.data);
        } catch (error) {
            toast.error(error.message || "Failed to show the details of about us.");
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        if (!filters || Object.keys(filters).length === 0) return;
        handleGetMS();
    }, [filters]);

    return { mS, nextToWatch, loading, msDetails, handleGetDetailsMS, aboutUs, handleAboutUs };
};

export default useMovieSeries;