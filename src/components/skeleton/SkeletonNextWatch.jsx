const SkeletonNextWatch = () => (
    <div className="container mt-1">
        <div className="row">
            <div className="col-md-12">
                <div className="bg-141414 py-3 px-3 rounded">
                    <div className="d-flex align-items-center gap-3">
                        <div className="skeleton-nextwatch-img"></div>
                        <div className="flex-grow-1">
                            <div className="skeleton-text w-25 mb-2"></div>
                            <div className="skeleton-text w-50 mb-2"></div>
                            <div className="skeleton-text w-75 mb-2"></div>
                            <div className="skeleton-text w-50 mb-1"></div>
                            <div className="skeleton-text w-25"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SkeletonNextWatch;