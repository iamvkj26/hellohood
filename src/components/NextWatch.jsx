import { Link } from "react-router";
import { formatDate } from "../utils/formatDate";

const NextWatch = ({ nextToWatch }) => {

    if (!nextToWatch) return null;
    const { msPoster, msName, msAbout, msRating, msGenre, msReleaseDate, msLink, msSeason } = nextToWatch;

    return (
        <>
            {nextToWatch && (
                <div className="container mt-1">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="bg-141414 py-3 px-3 rounded">
                                <div className="d-flex align-items-center gap-3">
                                    <Link className="text-decoration-none" to={msLink} target="_blank" rel="noopener noreferrer">
                                        <img className="next-watch-image" src={msPoster} alt={msName} />
                                    </Link>
                                    <div>
                                        <h6 className="text-secondary">🎥 Watch Next...</h6>
                                        <h5><strong>{msName}{msSeason === "0" ? "" : ` - (Season ${msSeason})`}</strong></h5>
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
            )}
        </>
    );
};

export default NextWatch;