import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import type { NextWatchs } from "../types";

const NextWatch = ({ nextToWatch }: NextWatchs) => {

    const navigate = useNavigate();

    if (!nextToWatch) return null;

    const { hashedId, msPoster, msName, msSeason, msAbout, msRating, msGenre, msReleaseDate } = nextToWatch;

    return (
        <div className="container mt-1">
            <div className="row">
                <div className="col-md-12">
                    <div className="bg-141414 py-3 px-3 rounded">
                        <div className="d-flex align-items-center gap-3 cp" onClick={() => navigate(`/details/${hashedId}`)}>
                            <img className="next-watch-image text-danger" src={msPoster} alt={msName} />
                            <div>
                                <h6 className="text-secondary">🎥 Watch Next...</h6>
                                <h5><strong>{msName} {msSeason === "0" ? "" : ` - (Season ${msSeason})`}</strong></h5>
                                <h6 className="text-muted small">{msAbout?.slice(0, 65)}...</h6>
                                <p className="text-secondary small">
                                    ⭐ <strong>{msRating}</strong> | 🎭 {msGenre?.join(", ")}
                                </p>
                                <p className="text-danger small">{formatDate(msReleaseDate)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NextWatch;