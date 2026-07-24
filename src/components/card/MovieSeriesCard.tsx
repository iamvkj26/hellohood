import { useNavigate } from "react-router";
import type { MovieSeriesCardProps } from "../../types";
import MovieSeriesCardFooter from "./MovieSeriesCardFooter";

const MovieSeriesCard = ({ msE }: MovieSeriesCardProps) => {

    const navigate = useNavigate();

    return (
        <div className="movie-series-card-wrapper">
            <div className="card position-relative cp bg-141414">
                <span className="position-absolute top-n10 end-0 badge rounded-pill bg-warning text-black">
                    <i className="fa-solid fa-star"></i> {msE.msRating}
                </span>
                <img loading="lazy" src={msE.msPoster} className="card-img text-danger" alt={msE.msName} onClick={() => navigate(`/details/${msE.hashedId}`)} />
                <MovieSeriesCardFooter msE={msE} />
            </div>
        </div>
    );
};

export default MovieSeriesCard;