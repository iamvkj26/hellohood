import useMovieSeries from "../../hooks/useMovieSeries";
import NextWatch from "../NextWatch";
import MovieCardList from "./MovieCardList";

const Card = ({ filters }) => {

    const { movieSeries, nextToWatch } = useMovieSeries(filters);

    return (
        <>
            <NextWatch
                nextToWatch={nextToWatch}
            />
            <div className="container mb-5">
                <MovieCardList
                    movieSeries={movieSeries}
                />
            </div>
        </>
    );
};

export default Card;