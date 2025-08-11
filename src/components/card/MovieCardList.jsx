import SkeletonCard from "../skeleton/SkeletonCard";
import MovieCard from "./MovieCard";

const MovieCardList = ({ mS, loading }) => (
    <>
        {Object.keys(mS).length > 0 ? (
            Object.entries(mS).reverse().map(([year, list]) => (
                <div key={year} className="mt-3">
                    <div className="h4">Year: {year}</div>
                    <hr />
                    <div className="card-grid">
                        {loading
                            ? list.map((_, idx) => <SkeletonCard key={idx} />)
                            : list.map((msE, idx) => <MovieCard key={idx} msE={msE} />)
                        }
                    </div>
                </div>
            ))
        ) : (
            <div className="text-center mt-5">
                <h5 className="text-muted">🎬 No Movie/Series Found</h5>
            </div>
        )}
    </>
);

export default MovieCardList;