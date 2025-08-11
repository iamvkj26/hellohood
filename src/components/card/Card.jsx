import useMovieSeries from "../../hooks/useMovieSeries";
import SkeletonNextWatch from "../skeleton/SkeletonNextWatch";
import NextWatch from "../NextWatch";
import MovieCardList from "./MovieCardList";

const Card = ({ filters }) => {

    const { mS, nextToWatch, loading } = useMovieSeries(filters);

    return (
        <>
            {
                loading ? <SkeletonNextWatch /> :
                    <NextWatch
                        nextToWatch={nextToWatch}
                    />
            }
            <div className="container mt-3 mb-3">
                <MovieCardList
                    mS={mS}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default Card;