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
        <nav className="navbar navbar-expand-lg bg-141414">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav w-100 d-flex justify-content-evenly flex-wrap">
                        {[
                            { key: "f", count: counts?.format.movie, label: "Movie", value: "movie", icon: "fa-film", color: "text-danger" },
                            { key: "f", count: counts?.format.series, label: "Web Series", value: "series", icon: "fa-tv", color: "text-primary" },
                            { key: "w", count: counts?.watched.unwatched, label: "To Watch", value: "false", icon: "fa-list", color: "text-warning" },
                            { key: "w", count: counts?.watched.watched, label: "Watched", value: "true", icon: "fa-check-double", color: "text-success" }
                        ].map(({ key, count, label, value, icon, color }) => (
                            <li className="nav-item" key={label}>
                                <button className="nav-link" title={count !== undefined ? `${label}: ${count}` : undefined} onClick={() => handleFilterClick(key as keyof FiltersType, value)}>
                                    <i className={`fa-solid ${icon} ${color} me-1`}></i>
                                    {label}
                                </button>
                            </li>
                        ))}
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-star text-info me-1"></i> Category
                            </button>
                            <ul className="dropdown-menu bg-141414">
                                {[
                                    { label: "Bollywood", value: "bollywood", count: counts?.industry.bollywood },
                                    { label: "Hollywood", value: "hollywood", count: counts?.industry.hollywood },
                                    { label: "Other", value: "other", count: counts?.industry.other }
                                ].map(({ label, value, count }) => (
                                    <li key={label}>
                                        <button className="dropdown-item" title={count !== undefined ? `${label}: ${count}` : undefined} onClick={() => handleFilterClick("i", value as FiltersType["i"])}>
                                            <i className="fa-solid fa-caret-right me-1"></i> {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-burst text-success me-1"></i> Genre
                            </button>
                            <ul className="dropdown-menu bg-141414">
                                {[
                                    { label: "Action", value: "action", count: counts?.genre.action },
                                    { label: "Adventure", value: "adventure", count: counts?.genre.adventure },
                                    { label: "Animation", value: "animation", count: counts?.genre.animation },
                                    { label: "Biopic", value: "biopic", count: counts?.genre.biopic },
                                    { label: "Comedy", value: "comedy", count: counts?.genre.comedy },
                                    { label: "Crime", value: "crime", count: counts?.genre.crime },
                                    { label: "Documentary", value: "documentary", count: counts?.genre.documentary },
                                    { label: "Drama", value: "drama", count: counts?.genre.drama },
                                    { label: "Fantasy", value: "fantasy", count: counts?.genre.fantasy },
                                    { label: "History", value: "history", count: counts?.genre.history },
                                    { label: "Horror", value: "horror", count: counts?.genre.horror },
                                    { label: "Mystery", value: "mystery", count: counts?.genre.mystery },
                                    { label: "Romance", value: "romance", count: counts?.genre.romance },
                                    { label: "Si-Fi", value: "si-fi", count: counts?.genre?.["si-fi"] },
                                    { label: "Thriller", value: "thriller", count: counts?.genre.thriller },
                                    { label: "War", value: "war", count: counts?.genre.war },
                                    { label: "18+", value: "18+", count: counts?.genre?.["18+"] }
                                ].map(({ label, value, count }) => (
                                    <li key={label}>
                                        <button className="dropdown-item" title={count !== undefined ? `${label}: ${count}` : undefined} onClick={() => handleFilterClick("g", value as FiltersType["g"])}>
                                            <i className="fa-solid fa-caret-right me-1"></i> {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-folder-open text-warning me-1"></i> Collections
                            </button>
                            <ul className="dropdown-menu bg-141414">
                                {collections.map((c, index) => {
                                    const count = counts?.collection?.[c.name.toLowerCase()] || 0
                                    return (
                                        <li key={index + 1}>
                                            <button className="dropdown-item" title={count !== undefined ? `${c.name}: ${count}` : undefined} onClick={() => handleFilterClick("c", c.name as FiltersType["c"])}>
                                                <i className="fa-solid fa-caret-right me-1"></i> {c.name}
                                            </button>
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                <i className="fa-solid fa-laptop text-primary me-1"></i> OTT
                            </button>
                            <ul className="dropdown-menu bg-141414">
                                {[
                                    { label: "Netflix", value: "netflix", count: counts?.ott.netflix },
                                    { label: "Prime", value: "prime", count: counts?.ott.prime },
                                    { label: "Hotstar", value: "hotstar", count: counts?.ott.hotstar },
                                    { label: "Zee 5", value: "zee5", count: counts?.ott.zee5 },
                                    { label: "SonyLiv", value: "sonyliv", count: counts?.ott.sonyliv },
                                    { label: "LionsGatePlay", value: "lionsgateplay", count: counts?.ott.lionsgateplay },
                                    { label: "Other", value: "other", count: counts?.ott.other },
                                    { label: "No OTT", value: "none", count: counts?.ott.none }
                                ].map(({ label, value, count }) => (
                                    <li key={label}>
                                        <button className="dropdown-item" title={count !== undefined ? `${label}: ${count}` : undefined} onClick={() => handleFilterClick("o", value as FiltersType["o"])}>
                                            <i className="fa-solid fa-caret-right me-1"></i> {label}
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