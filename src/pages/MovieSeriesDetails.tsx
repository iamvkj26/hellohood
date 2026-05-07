import { useEffect } from "react";
import moment from "moment";
import { useParams, Navigate } from "react-router";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import useFilters from "../hooks/useFilters";
import SearchBar from "../components/SearchBar";
import Information from "../components/Information";
import GenreBadge from "../components/shared/GenreBadge";
import { formatDate } from "../utils/formatDate";
import ottLogos from "../constants/ottLogos";

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
            <Information />

            <div className="container-fluid py-5"
                style={{ backgroundImage: `linear-gradient(rgba(20,20,20,0.92), rgba(20,20,20,0.95)), url(${msDetails.msPoster})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                <div className="container">
                    <div className="row align-items-start gy4">
                        <div className="col-md-4 text-center">
                            <div className="poster-card mx-auto">
                                <img
                                    src={msDetails.msPoster}
                                    className="img-fluid card-details-img"
                                    alt={msDetails.msName}
                                />
                                {
                                    msDetails.msLink === "/" ? (
                                        <div className="blockquote-footer py-3 mb-0 text-white">
                                            No OTT or direct links are available.
                                        </div>
                                    ) : (
                                        <a
                                            href={msDetails.msLink}
                                            className="btn btn-dark watch-btn  py-3"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            🔗 Watch Now
                                        </a>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-md-8">
                            <h1 className="fw-bold display-6 mb-2">
                                {msDetails.msName}
                                <span className="text-secondary fw-normal"> ({moment(msDetails.msReleaseDate).format("YYYY")})</span>
                            </h1>
                            <div className="d-flex flex-wrap gap-2 align-items-center text-light opacity-75 mb-2">
                                <span className="text-dange">
                                    • {formatDate(msDetails.msReleaseDate)} (RD)
                                </span>
                                <span className="text-capitalize">
                                    • {msDetails.msFormat}
                                </span>
                                <span className="text-capitalize">
                                    • {msDetails.msIndustry}
                                </span>
                            </div>
                            <p className="fs-5 text-light">
                                Overview:
                            </p>
                            <p className="fs-6 text-light-emphasis">
                                {msDetails.msAbout}
                            </p>
                            <p className="mb-2">
                                IMDb Rating: <strong className="text-warning">{msDetails.msRating}/10</strong>
                            </p>
                            <GenreBadge genres={msDetails.msGenre} />
                            <div className="row mt-4 gy-4">
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Cast
                                    </h6>
                                    <p className="text-light-emphasis mb-0">
                                        {(msDetails?.msCast?.length ?? 0) > 0 ? msDetails?.msCast?.join(", ") : "Not Available"}
                                    </p>
                                </div>
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Streaming On
                                    </h6>
                                    <div className="d-flex justify-content-start">
                                        {
                                            msDetails.msOTT === "none" ? "None" : (
                                                <img
                                                    src={ottLogos[msDetails?.msOTT ?? "none"] || ""}
                                                    alt={msDetails.msOTT}
                                                    className="rounded"
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        objectFit: "contain",
                                                        objectPosition: "left",
                                                        display: "block"
                                                    }}
                                                />
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    msDetails.sStatus && (
                                        <div className="col-6 col-md-4">
                                            <h6 className="fw-bold mb-1">
                                                Status
                                            </h6>
                                            <p className="text-capitalize text-light-emphasis mb-0">
                                                {msDetails.sStatus}
                                            </p>
                                        </div>
                                    )
                                }
                                {
                                    msDetails.sTSeasons && (
                                        <div className="col-6 col-md-4">
                                            <h6 className="fw-bold mb-1">
                                                Seasons
                                            </h6>
                                            <p className="text-light-emphasis mb-0">
                                                {msDetails.sTSeasons}
                                            </p>
                                        </div>
                                    )
                                }
                                <div className="col-6 col-md-4">
                                    <h6 className="fw-bold mb-1">
                                        Watched
                                    </h6>
                                    <p className="mb-0">
                                        {msDetails.msWatched ? (
                                            <span className="text-success">
                                                Yes
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                No
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSeriesDetails;