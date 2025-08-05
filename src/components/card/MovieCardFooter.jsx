const MovieCardFooter = ({ movie }) => (
    <div className="card-footer">
        <div className="blockquote-footer mt-1 mb-1 text-end">{movie.msName}{movie.msSeason === "0" ? "" : ` - (Season ${movie.msSeason})`}</div>
    </div>
);

export default MovieCardFooter;