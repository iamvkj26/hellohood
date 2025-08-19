import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router";
import useMovieSeries from "../hooks/useMovieSeries";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";
import GenreBadge from "../components/shared/GenreBadge";
import { formatDate } from "../utils/formatDate";
import type { MovieSeriesDetails as MSDetails } from "../types";

const MovieSeriesDetails = () => {

    const { id } = useParams<{ id: string }>();

    const { msDetails, handleGetDetailsMS } = useMovieSeries({});
    const { filters, updateFilter } = useFilters();

    const isValidId = /^[a-f0-9]{64}$/i.test(id || "");

    useEffect(() => {
        if (isValidId && id) handleGetDetailsMS(id);
    }, [isValidId, id, handleGetDetailsMS]);

    if (!isValidId) return <Navigate to="/" replace />;
    if (!msDetails) return <div className="text-center mt-3">Movie not found or invalid access.</div>;

    const { msPoster, msName, msSeason, msAbout, msRating, msReleaseDate, msFormat, msIndustry, msGenre, msLink, msUploadedBy } = msDetails as MSDetails;

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Information />

            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img src={msPoster} className="img-fluid card-details-img" alt={msName} />
                    </div>
                    <div className="col-md-7 text-center">
                        <p><strong>{msName}{msSeason === "0" ? "" : ` - (Season ${msSeason})`}</strong></p>
                        <p className="text-muted small">{msAbout}</p>
                        <p>IMDB Rating: <strong className="text-primary">{msRating}/10</strong></p>
                        <p>Release Date: <strong className="text-danger">{formatDate(msReleaseDate)}</strong></p>
                        <p>F/I: <strong className="text-muted">{msFormat}/{msIndustry}</strong></p>
                        <GenreBadge genres={msGenre} />
                        <hr className="border-danger border-2 opacity-75" />
                        <div className="text-center mb-3">
                            <Link to={msLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                🔗 Watch Now
                            </Link>
                        </div>
                        <hr className="border-danger border-2 opacity-75" />
                        <div className="text-end blockquote-footer mt-3 mb-3">{msUploadedBy}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSeriesDetails;