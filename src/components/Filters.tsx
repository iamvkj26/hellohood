import { useEffect } from "react";
import type { Filters as FiltersType } from "../hooks/useFilters";
import type { Counts } from "../types";
import useMovieSeries from "../hooks/useMovieSeries";

export interface FiltersProps {
    updateFilter: <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => void;
    resetFilters: () => void;
    counts: Counts | null;
};

const Filters = ({ updateFilter, resetFilters, counts }: FiltersProps) => {

    const { collections, handleCollectionsMS } = useMovieSeries();

    useEffect(() => {
        handleCollectionsMS();
        // eslint-disable-next-line
    }, []);

    const handleFilterClick = <K extends keyof FiltersType>(key: K, value: FiltersType[K]) => {
        updateFilter(key, value);
        closeNavbar();
    };

    const handleReset = () => {
        resetFilters();
        closeNavbar();
    };

    const closeNavbar = () => {
        const navbar = document.getElementById("navbarSupportedContent");
        if (navbar && navbar.classList.contains("show")) {
            const collapseInstance = window.bootstrap.Collapse.getInstance(navbar) || new window.bootstrap.Collapse(navbar, { toggle: false });
            collapseInstance.toggle();
        };
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav w-100 d-flex justify-content-evenly flex-wrap">
                        {[
                            { label: "Movie", key: "f", value: "movie", icon: "fa-film", color: "text-danger", count: counts?.format.movie },
                            { label: "Web Series", key: "f", value: "series", icon: "fa-tv", color: "text-secondary", count: counts?.format.series },
                            { label: "Bollywood", key: "i", value: "bollywood", icon: "fa-star", color: "text-warning", count: counts?.industry.bollywood },
                            { label: "Hollywood", key: "i", value: "hollywood", icon: "fa-clapperboard", color: "text-black", count: counts?.industry.hollywood },
                            { label: "Other", key: "i", value: "other", icon: "fa-globe", color: "text-primary", count: counts?.industry.others },
                            { label: "To Watch", key: "w", value: "false", icon: "fa-list", color: "text-info", count: counts?.watched.unwatched },
                            { label: "Watched", key: "w", value: "true", icon: "fa-check-double", color: "text-success", count: counts?.watched.watched }
                        ].map(({ label, key, value, icon, color, count }) => (
                            <li className="nav-item" key={label}>
                                <button className="nav-link" title={count !== undefined ? `${label}: ${count}` : undefined} onClick={() => handleFilterClick(key as keyof FiltersType, value)}>
                                    <i className={`fa-solid ${icon} ${color} me-1`}></i>
                                    {label}
                                </button>
                            </li>
                        ))}
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-burst text-secondary me-1"></i> Genre
                            </button>
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
                                    { label: "History", value: "history", emoji: "📜" },
                                    { label: "Horror", value: "horror", emoji: "👻" },
                                    { label: "Mystery", value: "mystery", emoji: "🕵️" },
                                    { label: "Romance", value: "romance", emoji: "💖" },
                                    { label: "Si-Fi", value: "si-fi", emoji: "🤖" },
                                    { label: "Thriller", value: "thriller", emoji: "👁️" },
                                    { label: "War", value: "war", emoji: "⚔️" },
                                    { label: "18+", value: "18+", emoji: "🔞" }
                                ].map(({ label, value, emoji }) => (
                                    <li key={label}>
                                        <button className="dropdown-item" onClick={() => handleFilterClick("g", value as FiltersType["g"])}>
                                            {emoji} {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-folder-open text-danger me-1"></i> Collections
                            </button>
                            <ul className="dropdown-menu">
                                {collections.map((c, index) => (
                                    <li key={index + 1}>
                                        <button className="dropdown-item" onClick={() => handleFilterClick("c", c.name as FiltersType["c"])}>
                                            <i className={`fa ${c.icon} me-2`}></i> {c.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </div>
                <button className="nav-link" onClick={handleReset}>
                    <i className="fa-solid fa-rotate-left text-danger me-1"></i> Clear filters
                </button>
            </div>
        </nav>
    );
};

export default Filters;