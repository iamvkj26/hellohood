import { useState, useEffect } from "react";
import type { Filters } from "../hooks/useFilters";

type SearchBarProps = {
    updateFilter: (key: keyof Filters, value: string) => void;
    searchValue?: string;
};

const SearchBar = ({ updateFilter, searchValue = "" }: SearchBarProps) => {

    const [search, setSearch] = useState<string>(searchValue);

    useEffect(() => {
        setSearch(searchValue);
    }, [searchValue]);

    const handleSearch = () => {
        if (search.trim()) updateFilter("s", search.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <nav className="navbar navbar-expand-lg search-background bg-141414">
            <div className="container-fluid">
                <div className="mx-auto">
                    <div className="h4 mb-3 text-light">Search for a movie, web series, person here...</div>
                    <div className="d-flex">
                        <input type="search" className="form-control search-italic bg-141414 me-2" placeholder="Search for a movie, web series, person..."
                            value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
                        <button className="btn btn-dark btn-141414" type="button" onClick={handleSearch}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default SearchBar;