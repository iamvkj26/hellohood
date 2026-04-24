import type { CastBadgeProps } from "../../types";

const CastBadge = ({ casts = [] }: CastBadgeProps) => {

    if (!casts.length) return null;

    return (
        <div className="card-text text-center text-muted">
            <strong className="text-light">Cast:</strong>
            <br />
            <i className="fst-italic">{casts.join(", ")}</i>
        </div>
    );
};

export default CastBadge;