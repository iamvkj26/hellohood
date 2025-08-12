import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getMS, getDetailsMS, getAboutUs } from "../api/movieseries";

const useMovieSeries = (filters) => {

    const [mS, setMS] = useState({});
    const [nextToWatch, setNextToWatch] = useState(null);
    const [msDetails, setMSDetails] = useState(null);
    const [aboutUs, setAboutUs] = useState({});
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const limit = 20;

    const handleGetMS = async (append = false, skipOverride = null) => {
        try {
            append ? setLoading(true) : setLoadingInitial(true);
            const currentSkip = skipOverride ?? skip;
            const response = await getMS(filters, currentSkip, limit);

            if (response.data && Object.keys(response.data).length > 0) {
                setMS(prev => {
                    if (!append) return response.data;
                    const merged = { ...prev };
                    Object.entries(response.data).forEach(([year, items]) => {
                        merged[year] = merged[year] ? [...merged[year], ...items] : [...items];
                    });
                    return merged;
                });
                setSkip(currentSkip + limit);
            } else {
                setHasMore(false);
            };
            const unwatched = Object.values(response.data).flat().filter(m => !m.msWatched);
            const random = unwatched.length ? unwatched[Math.floor(Math.random() * unwatched.length)] : null;
            setNextToWatch(random);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series.");
        } finally {
            setTimeout(() => setLoadingInitial(false), 100);
            setLoading(false);
        };
    };

    const handleGetDetailsMS = async (id) => {
        try {
            setLoading(true);
            const { data } = await getDetailsMS(id);
            setMSDetails(data);
        } catch (error) {
            toast.error(error.message || "Failed to fetch movie/series details.");
        } finally {
            setLoading(false);
        };
    };

    const handleAboutUs = async () => {
        try {
            setLoading(true);
            const { data } = await getAboutUs();
            setAboutUs(data);
        } catch (error) {
            toast.error(error.message || "Failed to show the details of about us.");
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        if (!filters || Object.keys(filters).length === 0) return;
        setSkip(0);
        setHasMore(true);
        setMS({});
        handleGetMS(false, 0);
        // eslint-disable-next-line
    }, [filters]);

    return { mS, nextToWatch, loadingInitial, loading, msDetails, handleGetDetailsMS, aboutUs, handleAboutUs, hasMore, handleGetMS };
};

export default useMovieSeries;