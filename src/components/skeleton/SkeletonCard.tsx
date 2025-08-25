const SkeletonCard = () => (
    <div className="movie-card-wrapper" aria-hidden="true">
        <div className="card position-relative bg-dark border-0">
            <span className="position-absolute top-n10 end-0 badge rounded-pill skeleton skeleton-card-badge">
                <i className="fa-solid fa-star"></i>
            </span>
            <div className="card-img skeleton skeleton-card-img"></div>
            <div className="card-footer bg-dark border-0">
                <div className="skeleton skeleton-card-text"></div>
            </div>
        </div>
    </div>
);

export default SkeletonCard;