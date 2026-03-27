import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { getMS, getDetailsMS, getCollectionMS, getAboutUs, getContact } from "../api/movieseries";
import type { UseMovieSeriesReturn, MovieSeriesItem, MovieSeriesGrouped, Section, Counts, MovieSeriesDetails, Collection, AboutUsType, ContactUsType, Filters } from "../types";

const useMovieSeries = (filters?: Filters): UseMovieSeriesReturn => {

    const [mS, setMS] = useState<MovieSeriesGrouped>({});
    const [nextToWatch, setNextToWatch] = useState<MovieSeriesItem | null>(null);
    const [counts, setCounts] = useState<Counts | null>(null);
    const [msDetails, setMSDetails] = useState<MovieSeriesDetails | null>(null);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [aboutUs, setAboutUs] = useState<AboutUsType | null>(null);
    const [contactUs, setContactUs] = useState<ContactUsType[]>([]);
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
            setCounts(data.counts);

            if (data && Object.keys(data).length > 0) {
                setMS(prev => {
                    let updated: MovieSeriesGrouped;
                    if (!append) {
                        updated = {};
                        (data.data as Section[]).forEach((section) => {
                            updated[section.label] = Array.isArray(section.movies) ? section.movies : [];
                        });
                    } else {
                        updated = { ...prev };
                        (data.data as Section[]).forEach((section) => {
                            const safeMovies = Array.isArray(section.movies) ? section.movies : [];
                            const existing = Array.isArray(updated[section.label]) ? updated[section.label] : [];
                            updated[section.label] = [...existing, ...safeMovies];
                        });
                    };

                    const now = new Date();
                    const unwatched: MovieSeriesItem[] = Object.entries(updated).flatMap(([, movies]) => movies).filter(m => !m.msWatched && m.msReleaseDate && new Date(m.msReleaseDate) <= now);
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

    const handleCollectionsMS = useCallback(async () => {
        try {
            const { data } = await getCollectionMS();
            if (data && typeof data === "object") {
                setCollections(data.data);
            } else {
                toast.error("Failed to fetch collections.");
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to fetch movie/series details.";
            toast.error(message);
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

    const handleContactUs = async () => {
        try {
            setLoading(true);
            const { data } = await getContact();
            if (data && typeof data === "object") {
                setContactUs(data.data);
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
        setCounts(null);
        handleGetMS(false, 0);
        // eslint-disable-next-line
    }, [filters]);

    return {
        mS, nextToWatch, loadingInitial, loading, msDetails, collections, aboutUs, contactUs, hasMore, counts, handleGetMS, handleGetDetailsMS, handleCollectionsMS, handleAboutUs, handleContactUs
    };
};

export default useMovieSeries;