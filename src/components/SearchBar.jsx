import { useState, useEffect } from "react";

const SearchBar = ({ updateFilter, searchValue }) => {

    const [search, setSearch] = useState(searchValue || "");

    useEffect(() => {
        setSearch(searchValue);
    }, [searchValue]);

    const handleSearch = () => {
        if (search.trim()) updateFilter("s", search.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary search-background">
                <div className="container-fluid">
                    <div className="mx-auto">
                        <div className="h4 mb-3">Search for movies, web series here...</div>
                        <div className="d-flex">
                            <input type="search" className="form-control me-2" placeholder="Search the movies, web series..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                            <button className="btn btn-dark btn-212529" type="button" onClick={handleSearch}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default SearchBar;