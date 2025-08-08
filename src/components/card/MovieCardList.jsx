import MovieCard from "./MovieCard";

const MovieCardList = ({ mS }) => (
    <>
        {Object.keys(mS).length > 0 ? (
            Object.entries(mS).reverse().map(([year, list]) => (
                <div key={year} className="mt-3">
                    <div className="h4">Year: {year}</div>
                    <hr />
                    <div className="card-grid">
                        {list.map(msE => (
                            <MovieCard
                                msE={msE}
                                key={msE.hashedId}
                            />
                        ))}
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