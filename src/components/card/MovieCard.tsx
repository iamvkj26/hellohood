import { useNavigate } from "react-router";
import type { MovieCardProps } from "../../types";
import MovieCardFooter from "./MovieCardFooter";

const MovieCard = ({ msE }: MovieCardProps) => {

    const navigate = useNavigate();

    return (
        <div className="movie-card-wrapper">
            <div className="card position-relative cp" onClick={() => navigate(`/details/${msE.hashedId}`)}>
                <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                    <i className="fa-solid fa-star"></i> {msE.msRating}
                </span>
                <img src={msE.msPoster} className="card-img text-danger" alt={msE.msName} loading="lazy" />
                <MovieCardFooter msE={msE} />
            </div>
        </div>
    );
};

export default MovieCard;