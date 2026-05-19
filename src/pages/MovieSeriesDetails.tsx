import { useEffect } from "react";
import { useParams, Navigate } from "react-router";
import moment from "moment";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import MovieSeriesDetailsCard from "../components/card/MovieSeriesDetailsCard";
import SeasonsCard from "../components/card/SeasonsCard";

const MovieSeriesDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { msDetails, handleGetDetailsMS } = useMovieSeries({});
    const { filters, updateFilter } = useFilters();

    const isValidId = /^[a-f0-9]{64}$/i.test(id || "");

    useEffect(() => {
        if (isValidId && id) handleGetDetailsMS(id);
    }, [isValidId, id, handleGetDetailsMS]);

    usePageTitle(`${msDetails?.msName} (${moment(msDetails?.msReleaseDate).year()})`);

    if (!isValidId) return <Navigate to="/" replace />;
    if (!msDetails) return <div className="text-center mt-3">Movie not found or invalid access.</div>;

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <MovieSeriesDetailsCard msDetails={msDetails} />
            {msDetails?.msFormat === "series" && (<SeasonsCard seasons={msDetails?.sSeasons} />)}
        </>
    );
};

export default MovieSeriesDetails;