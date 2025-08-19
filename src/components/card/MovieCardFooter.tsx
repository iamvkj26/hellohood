import type { MovieCardFooterProps } from "../../types";

const MovieCardFooter = ({ msE }: MovieCardFooterProps) => (
    <div className="card-footer">
        <div className="blockquote-footer mt-1 mb-1 text-end">
            {msE.msName}{msE.msSeason === "0" ? "" : ` - (Season ${msE.msSeason})`}
        </div>
    </div>
);

export default MovieCardFooter;