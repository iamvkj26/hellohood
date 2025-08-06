import useMovieSeries from "../../hooks/useMovieSeries";
import NextWatch from "../NextWatch";
import MovieCardList from "./MovieCardList";

const Card = ({ filters }) => {

    const { movieSeries, nextToWatch, loading } = useMovieSeries(filters);

    return (
        <>
            <NextWatch
                nextToWatch={nextToWatch}
            />
            <div className="container mb-5">
                {
                    loading ? <div className="d-flex justify-content-center mt-5">Loading...</div> : <MovieCardList
                        movieSeries={movieSeries}
                    />
                }
            </div>
        </>
    );
};

export default Card;