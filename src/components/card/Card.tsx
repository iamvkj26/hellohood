import type { Filters } from "../../hooks/useFilters";
import useMovieSeries from "../../hooks/useMovieSeries";
import SkeletonNextWatch from "../skeleton/SkeletonNextWatch";
import NextWatch from "../NextWatch";
import MovieCardList from "./MovieCardList";

type CardProps = {
    filters: Filters;
};

const Card = ({ filters }: CardProps) => {

    const { mS, nextToWatch, loadingInitial, loading, hasMore, handleGetMS } = useMovieSeries(filters);

    return (
        <>
            {loading ? (<SkeletonNextWatch />) : (<NextWatch nextToWatch={nextToWatch} />)}
            <div className="container mt-3 mb-3">
                <MovieCardList mS={mS} loadingInitial={loadingInitial} loading={loading} loadMore={handleGetMS} hasMore={hasMore} />
            </div>
        </>
    );
};

export default Card;