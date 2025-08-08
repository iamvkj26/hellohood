import { useNavigate } from "react-router";
import MovieCardFooter from "./MovieCardFooter";

const MovieCard = ({ msE }) => {

    const navigate = useNavigate();
    const handleCardClick = () => navigate(`/details/${msE.hashedId}`);

    return (
        <>
            <div className="movie-card-wrapper">
                <div className="card position-relative cp" onClick={handleCardClick}>
                    <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                        <i className="fa-solid fa-star"></i> {msE.msRating}
                    </span>
                    <img src={msE.msPoster} className="card-img text-danger" alt={msE.msName} />
                    <MovieCardFooter msE={msE} />
                </div>
            </div>
        </>
    );
};

export default MovieCard;