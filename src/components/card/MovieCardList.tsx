import InfiniteScroll from "react-infinite-scroll-component";
import type { MovieCardListProps, MovieSeriesItem, Section } from "../../types";
import SkeletonCard from "../skeleton/SkeletonCard";
import MovieCard from "./MovieCard";

const MovieCardList = ({ mS, loadingInitial, loading, loadMore, hasMore }: MovieCardListProps) => {

    const allMovies: Section[] = Object.entries(mS).sort(([a], [b]) => {
        if (a === "upcoming") return -1;
        if (b === "upcoming") return 1;
        return Number(b) - Number(a);
    }).map(([label, list]) => ({ label, movies: Array.isArray(list) ? list : [], }));

    if (loadingInitial) {
        const skeletonData: Section[] = [
            { label: "upcoming", movies: Array.from({ length: 4 }) as MovieSeriesItem[] },
            { label: "2025", movies: Array.from({ length: 4 }) as MovieSeriesItem[] },
            { label: "2015", movies: Array.from({ length: 3 }) as MovieSeriesItem[] },
            { label: "2005", movies: Array.from({ length: 2 }) as MovieSeriesItem[] },
            { label: "1995", movies: Array.from({ length: 1 }) as MovieSeriesItem[] },
        ];

        return (
            <>
                {skeletonData.sort((a, b) => {
                    if (a.label === "upcoming") return -1;
                    if (b.label === "upcoming") return 1;
                    return Number(b.label) - Number(a.label);
                }).map(({ label, movies }) => (
                    <div key={label} className="mt-3">
                        <div className="h4">
                            {label === "upcoming" ? "Upcoming Movies/Series" : `Year: ${label}`}
                        </div>
                        <hr />
                        <div className="card-grid">
                            {movies.map((_, idx) => (
                                <SkeletonCard key={idx} />
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <InfiniteScroll
            dataLength={allMovies.reduce((acc, section) => acc + section.movies.length, 0)}
            next={() => loadMore(true)}
            hasMore={hasMore}
            loader={
                loading && (
                    <>
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <SkeletonCard key={idx} />
                        ))}
                    </>
                )
            }
        >
            {allMovies.length > 0 ? (
                allMovies.map(({ label, movies }) => (
                    <div key={label} className="mt-3">
                        <div className="h4">
                            {label === "upcoming" ? "Upcoming Movies/Series" : `Year: ${label}`}
                        </div>
                        <hr />
                        <div className="card-grid">
                            {movies.map((msE, idx) => (
                                <MovieCard key={idx} msE={msE} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                !loading && (
                    <div className="text-center mt-5">
                        <h5 className="text-muted">🎬 No Movie/Series Found</h5>
                    </div>
                )
            )}
        </InfiniteScroll>
    );
};

export default MovieCardList;