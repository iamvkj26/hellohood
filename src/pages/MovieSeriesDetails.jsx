import { useEffect } from "react";
import { useParams, Link } from "react-router";
import useMovieSeries from "../hooks/useMovieSeries";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";
import GenreBadge from "../components/shared/GenreBadge";
import { formatDate } from "../utils/formatDate";

const MovieSeriesDetails = () => {

    const { id } = useParams();

    const { msDetails, handleGetDetailsMS } = useMovieSeries();
    const { filters, updateFilter } = useFilters();

    useEffect(() => {
        handleGetDetailsMS(id);
    }, [id]);

    if (!msDetails) return <div className="text-center mt-3">Movie not found or invalid access.</div>;

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Information />

            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col-md-5 text-center">
                        <img src={msDetails.msPoster} className="img-fluid card-details-img" alt={msDetails.msName} />
                    </div>
                    <div className="col-md-7 text-center">
                        <p><strong>{msDetails.msName}{msDetails.msSeason === "0" ? "" : ` - (Season ${msDetails.msSeason})`}</strong></p>
                        <p className="text-muted small">{msDetails.msAbout}</p>
                        <p>IMDB Rating: <strong className="text-primary">{msDetails.msRating}/10</strong></p>
                        <p>Release Date: <strong className="text-danger"> {formatDate(msDetails.msReleaseDate)}</strong></p>
                        <p>F/I: <strong className="text-muted">{msDetails.msFormat}/{msDetails.msIndustry}</strong></p>
                        <GenreBadge genres={msDetails.msGenre} />
                        <hr className="border-danger border-2 opacity-75" />
                        <div className="text-center mb-3">
                            <Link to={msDetails.msLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                🔗 Watch Now
                            </Link>
                        </div>
                        <hr className="border-danger border-2 opacity-75" />
                        <div className="text-end blockquote-footer mt-3 mb-3">{msDetails.msUploadedBy}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSeriesDetails;