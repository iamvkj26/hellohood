import type { CastProps } from "../../types";

const CastCarousel = ({ casts = [], format }: CastProps) => {
    return (
        <div className="container mt-3">
            <hr />
            <h4 className="mt-3">{format === "series" ? "Series" : "Movie"} Cast</h4>
            <div className="castSlider">
                {casts?.map((cast) => (
                    <div key={cast.id} className="castCard">
                        <img src={cast.profile ? `https://image.tmdb.org/t/p/w300${cast.profile}` : "/placeholder.jpg"} alt={cast.name} />
                        <div className="castBody">
                            <h6>{cast.name}</h6>
                            <p>{cast.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastCarousel;