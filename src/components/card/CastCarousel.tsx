import { Link } from "react-router";
import type { CastProps } from "../../types";

const CastCarousel = ({ casts = [], format }: CastProps) => {
    return (
        <div className="container mt-3">
            <hr />
            <h4 className="mt-3">{format === "series" ? "Series" : "Movie"} Cast</h4>
            {
                casts.length === 0 ? (
                    <div className="small">
                        We don't have any cast for this {format === "series" ? "Web Series" : "Movie"}. You can help by adding some!
                    </div>
                ) : (
                    <div className="castSlider">
                        {casts?.map((cast) => (
                            <Link key={cast.id} to={`https://www.google.com/search?q=${encodeURIComponent(cast.name)}`} target="_blank" rel="noopener noreferrer" className="card castCard">
                                {cast.profile ? (<img src={`https://image.tmdb.org/t/p/w300${cast.profile}`} />) : (<div className="cast-profile-placeholder">No Image</div>)}
                                <div className="castBody">
                                    <h6>{cast.name}</h6>
                                    <p>{cast.character}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default CastCarousel;