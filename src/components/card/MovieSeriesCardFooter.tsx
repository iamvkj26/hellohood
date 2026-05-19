import type { MovieSeriesCardFooterProps } from "../../types";

const MovieSeriesCardFooter = ({ msE }: MovieSeriesCardFooterProps) => (
    <div className="card-footer bg-141414">
        <div className="blockquote-footer text-capitalize mt-1 mb-1 text-end">
            {msE.msName}
            <br />
            {msE.sTSeasons == null ? "" : `• ${msE.sTSeasons} ${msE.sTSeasons === 1 ? "Season" : "Seasons"}`} {msE.msStatus === null ? "" : `• ${msE.msStatus}`}
        </div>
    </div>
);

export default MovieSeriesCardFooter;