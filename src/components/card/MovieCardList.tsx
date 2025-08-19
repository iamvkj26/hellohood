import InfiniteScroll from "react-infinite-scroll-component";
import type { MovieCardListProps, MovieSeriesItem } from "../../types";
import SkeletonCard from "../skeleton/SkeletonCard";
import MovieCard from "./MovieCard";

const MovieCardList = ({ mS, loadingInitial, loading, loadMore, hasMore }: MovieCardListProps) => {

    const allMovies = Object.entries(mS).sort(([a], [b]) => Number(b) - Number(a)).map(([year, list]) => [year, Array.isArray(list) ? list : []] as [string, MovieSeriesItem[]]);

    if (loadingInitial) {
        const skeletonData: [string, unknown[]][] = [
            ["2025", Array.from({ length: 4 })],
            ["2010", Array.from({ length: 3 })],
            ["1985", Array.from({ length: 1 })],
            ["2000", Array.from({ length: 2 })]
        ];

        return (
            <>
                {
                    skeletonData.sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => (
                        <div key={year} className="mt-3">
                            <div className="h4">Year: {year}</div>
                            <hr />
                            <div className="card-grid">
                                {items.map((_, idx) => (
                                    <SkeletonCard key={idx} />
                                ))}
                            </div>
                        </div>
                    ))
                }
            </>
        );
    };

    return (
        <InfiniteScroll
            dataLength={allMovies.reduce((acc, [, list]) => acc + list.length, 0)}
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
            {
                allMovies.length > 0 ? (
                    allMovies.map(([year, list]) => (
                        <div key={year} className="mt-3">
                            <div className="h4">Year: {year}</div>
                            <hr />
                            <div className="card-grid">
                                {list.map((msE, idx) => (
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
                )
            }
        </InfiniteScroll>
    );
};

export default MovieCardList;
