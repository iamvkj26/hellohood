import type { GenreBadgeProps } from "../../types";

const GenreBadge = ({ genres = [] }: GenreBadgeProps) => {

    if (!genres.length) return null;

    return (
        <div className="card-text text-center text-danger">
            <strong className="text-light">Genre:</strong>
            <br />
            <i className="fst-italic">{genres.join(", ")}</i>
        </div>
    );
};

export default GenreBadge;