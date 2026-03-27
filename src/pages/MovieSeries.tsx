import useFilters from "../hooks/useFilters";
import useMovieSeries from "../hooks/useMovieSeries";
import usePageTitle from "../hooks/usePageTitle";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Information from "../components/Information";
import FiltersMessage from "../components/FiltersMessage";
import Card from "../components/card/Card";
import SkeletonFiltersMessage from "../components/skeleton/SkeletonFiltersMessage";

const capitalize = (val?: string) => val ? val.charAt(0).toUpperCase() + val.slice(1) : "";

const MovieSeries = () => {

    const { filters, ready, updateFilter, resetFilters } = useFilters();
    const { loading, counts } = useMovieSeries(filters);

    const activeFilters: string[] = [];

    if (filters.f) activeFilters.push(filters.f === "movie" ? "Movies" : "Web Series");
    if (filters.i) activeFilters.push(capitalize(filters.i));
    if (filters.w) activeFilters.push(filters.w === "true" ? "Watched" : "To Watch");
    if (filters.g) activeFilters.push(capitalize(filters.g));
    if (filters.c) activeFilters.push(capitalize(filters.c));

    const hasSearch = !!filters.s;

    let title = "Movies, Web Series";

    if (hasSearch && activeFilters.length === 0) title = `Search: ${filters.s}`;
    else if (!hasSearch && activeFilters.length === 1) title = activeFilters[0];
    else if (hasSearch || activeFilters.length > 1) {
        const parts: string[] = [];
        if (hasSearch) parts.push(`Search: ${filters.s}`);
        parts.push(...activeFilters);
        title = parts.join(" | ");
    };

    usePageTitle(`${title} | HelloHood`);

    if (!ready || !filters) return null;

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Filters updateFilter={updateFilter} resetFilters={resetFilters} counts={counts} />
            <Information />
            {loading ? (<SkeletonFiltersMessage />) : <FiltersMessage filters={filters} />}
            <Card filters={filters} />
        </>
    );
};

export default MovieSeries;