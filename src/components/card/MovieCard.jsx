import { useNavigate } from "react-router";
import MovieCardFooter from "./MovieCardFooter";

const MovieCard = ({ movie }) => {

    const navigate = useNavigate();

    const handleCardClick = () => navigate(`/details/${movie.msName}`, { state: { movie } });

    return (
        <>
            <div className="movie-card-wrapper">
                <div className="card position-relative cp" onClick={handleCardClick}>
                    <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                        <i className="fa-solid fa-star"></i> {movie.msRating}
                    </span>
                    <img src={movie.msPoster} className="card-img text-danger" alt={movie.msName} />
                    <MovieCardFooter
                        movie={movie}
                    />
                </div>
            </div>
        </>
    );
};

export default MovieCard;