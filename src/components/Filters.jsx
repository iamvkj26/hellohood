import { Link } from "react-router";

const Filters = ({ updateFilter, resetFilters }) => {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav w-100 d-flex justify-content-evenly flex-wrap">
                            {[
                                { label: "Movie", key: "f", value: "movie", icon: "fa-film", color: "text-danger" },
                                { label: "Web Series", key: "f", value: "series", icon: "fa-tv", color: "text-primary" },
                                { label: "Bollywood", key: "i", value: "bollywood", icon: "fa-star", color: "text-warning" },
                                { label: "Hollywood", key: "i", value: "hollywood", icon: "fa-clapperboard", color: "text-black" },
                                { label: "Other", key: "i", value: "other", icon: "fa-globe", color: "text-info" },
                                { label: "Watched", key: "w", value: "true", icon: "fa-check-double", color: "text-success" }
                            ].map(({ label, key, value, icon, color }) => (
                                <li className="nav-item" key={label}>
                                    <Link className="nav-link" onClick={() => updateFilter(key, value)}>
                                        <i className={`fa-solid ${icon} ${color} me-1`}></i> {label}
                                    </Link>
                                </li>
                            ))}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                    <i className="fa-solid fa-burst text-secondary me-1"></i> Genre
                                </Link>
                                <ul className="dropdown-menu">
                                    {[
                                        { label: "Action", value: "action", emoji: "🎬" },
                                        { label: "Adventure", value: "adventure", emoji: "🧭" },
                                        { label: "Animation", value: "animation", emoji: "🎞️" },
                                        { label: "Biopic", value: "biopic", emoji: "✨" },
                                        { label: "Comedy", value: "comedy", emoji: "😂" },
                                        { label: "Crime", value: "crime", emoji: "⚖️" },
                                        { label: "Documentary", value: "documentary", emoji: "📚" },
                                        { label: "Drama", value: "drama", emoji: "🎭" },
                                        { label: "Fantasy", value: "fantasy", emoji: "🧙" },
                                        { label: "Horror", value: "horror", emoji: "👻" },
                                        { label: "Mystery", value: "mystery", emoji: "🕵️" },
                                        { label: "Other", value: "other", emoji: "🔖" },
                                        { label: "Romance", value: "romance", emoji: "💖" },
                                        { label: "Si-Fi", value: "si-fi", emoji: "🤖" },
                                        { label: "Thriller", value: "thriller", emoji: "👁️" },
                                        { label: "18+", value: "18+", emoji: "🔞" }
                                    ].map(({ label, value, emoji }) => (
                                        <li key={label}>
                                            <Link className="dropdown-item" onClick={() => updateFilter("g", value)}>
                                                {emoji} {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <Link className="nav-link" onClick={resetFilters}>
                        <i className="fa-solid fa-rotate-left me-1"></i> Clear filters
                    </Link>
                </div>
            </nav>
        </>
    );
};

export default Filters;