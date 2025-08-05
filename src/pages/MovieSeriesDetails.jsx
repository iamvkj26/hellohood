import { useLocation, Link } from "react-router";
import { formatDate } from "../utils/formatDate";
import GenreBadge from "../components/shared/GenreBadge";

const MovieSeriesDetails = () => {

    const { movie } = useLocation().state;

    if (!movie) return <div className="text-center mt-5">Movie not found.</div>;

    return (
        <>
            <div className="container my-4 position-relative">
                <div className="text-center mb-3">
                    <img src={movie.msPoster} className="img-fluid card-details-img" alt={movie.msName} />
                </div>
                <div className="text-center">
                    <p><strong>{movie.msName}{movie.msSeason === "0" ? "" : ` - (Season ${movie.msSeason})`}</strong></p>
                    <p className="text-muted small">{movie.msAbout}</p>
                    <p>IMDB Rating: <strong className="text-primary">{movie.msRating}/10</strong></p>
                    <p>Release Date: <strong className="text-danger"> {formatDate(movie.msReleaseDate)}</strong></p>
                    <p>F/I: <strong className="text-muted">{movie.msFormat}/{movie.msIndustry}</strong></p>
                    <GenreBadge genres={movie.msGenre} />
                    <hr className="border-danger border-2 opacity-75" />
                    <div className="text-center mb-3">
                        <Link to={movie.msLink} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                            🔗 Watch Now
                        </Link>
                    </div>
                    <hr className="border-danger border-2 opacity-75" />
                    <div className="text-end blockquote-footer mt-3 mb-3">{movie.msUploadedBy}</div>
                </div>
            </div>
        </>
    );
};

export default MovieSeriesDetails;