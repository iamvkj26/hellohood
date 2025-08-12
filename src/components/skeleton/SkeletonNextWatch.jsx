const SkeletonNextWatch = () => (
    <div className="container mt-1" aria-hidden="true">
        <div className="row">
            <div className="col-md-12">
                <div className="bg-141414 py-3 px-3 rounded">
                    <div className="d-flex align-items-center gap-3">
                        <div className="skeleton-nextwatch-img"></div>
                        <div className="flex-grow-1">
                            {["w-25 mb-2", "w-50 mb-2", "w-75 mb-2", "w-50 mb-1", "w-25"].map((cls, i) => (
                                <div key={i} className={`skeleton-text ${cls}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonNextWatch;