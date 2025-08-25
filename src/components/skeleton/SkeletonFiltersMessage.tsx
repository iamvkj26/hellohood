const SkeletonFiltersMessage = () => {
    return (
        <>
            <div className="container mt-1" aria-hidden="true">
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-141414 py-3 px-3 rounded">
                            <h6 className="text-light m-0 d-flex align-items-center gap-2">
                                <div className="badge bg-warning text-black skeleton">
                                    <i className="fa-solid fa-folder"></i>
                                </div>
                                <div className="skeleton skeleton-message-text"></div>
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SkeletonFiltersMessage;