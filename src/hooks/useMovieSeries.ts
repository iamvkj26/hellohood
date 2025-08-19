import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { getMS, getDetailsMS, getAboutUs } from "../api/movieseries";
import type { UseMovieSeriesReturn, MovieSeriesItem, MovieSeriesGrouped, MovieSeriesDetails, AboutUsType, Filters } from "../types";

const useMovieSeries = (filters?: Filters): UseMovieSeriesReturn => {

    const [mS, setMS] = useState<MovieSeriesGrouped>({});
    const [nextToWatch, setNextToWatch] = useState<MovieSeriesItem | null>(null);
    const [msDetails, setMSDetails] = useState<MovieSeriesDetails | null>(null);
    const [aboutUs, setAboutUs] = useState<AboutUsType | null>(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(true);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const limit = 20;

    const handleGetMS = async (append: boolean = false, skipOverride: number | null = null): Promise<void> => {
        if (!hasMore) return;
        try {
            if (append) setLoading(true)
            else setLoadingInitial(true);

            const currentSkip = skipOverride ?? skip;
            const { data } = await getMS(filters, currentSkip, limit);

            if (data && Object.keys(data).length > 0) {
                setMS(prev => {
                    let updated: MovieSeriesGrouped;
                    if (!append) updated = data.data;
                    else {
                        updated = { ...prev };
                        Object.entries(data.data).forEach(([year, items]) => {
                            updated[year] = updated[year] ? [...updated[year], ...(items as MovieSeriesItem[])] : [...(items as MovieSeriesItem[])];
                        });
                    };
                    const unwatched: MovieSeriesItem[] = Object.values(updated).flat().filter(m => !m.msWatched);
                    const random: MovieSeriesItem | null = unwatched.length ? unwatched[Math.floor(Math.random() * unwatched.length)] : null;
                    setNextToWatch(random);
                    return updated;
                });
                setSkip(currentSkip + limit);
            } else {
                setHasMore(false);
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to fetch movie/series.";
            toast.error(message);
        } finally {
            setLoadingInitial(false);
            setLoading(false);
        };
    };

    const handleGetDetailsMS = useCallback(async (id: string) => {
        try {
            setLoading(true);
            const { data } = await getDetailsMS(id);
            if (data && typeof data === "object") {
                setMSDetails(data.data as MovieSeriesDetails);
            } else {
                toast.error("Invalid data received for movie/series details.");
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to fetch movie/series details.";
            toast.error(message);
        } finally {
            setLoading(false);
        };
    }, []);

    const handleAboutUs = async () => {
        try {
            setLoading(true);
            const { data } = await getAboutUs();
            if (data && typeof data === "object") {
                setAboutUs(data.data as AboutUsType);
            } else {
                toast.error("Invalid About Us data received.");
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to fetch About Us.";
            toast.error(message);
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

    return {
        mS, nextToWatch, loadingInitial, loading, msDetails, aboutUs, hasMore, handleGetMS, handleGetDetailsMS, handleAboutUs
    };
};

export default useMovieSeries;