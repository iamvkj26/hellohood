import type { MovieCardFooterProps } from "../../types";

const MovieCardFooter = ({ msE }: MovieCardFooterProps) => (
    <div className="card-footer">
        <div className="blockquote-footer text-capitalize mt-1 mb-1 text-end">
            {msE.msName}
            <br />
            {msE.sSeasons === null ? "" : `• ${msE.sSeasons} Seasons`} {msE.sStatus === null ? "" : `• ${msE.sStatus}`}
        </div>
    </div>
);

export default MovieCardFooter;