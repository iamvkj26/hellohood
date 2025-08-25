import useFilters from "../hooks/useFilters";
import useMovieSeries from "../hooks/useMovieSeries";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import Information from "../components/Information";
import FiltersMessage from "../components/FiltersMessage";
import Card from "../components/card/Card";
import SkeletonFiltersMessage from "../components/skeleton/SkeletonFiltersMessage";

const MovieSeries = () => {

    const { filters, ready, updateFilter, resetFilters } = useFilters();
    const { loading } = useMovieSeries(filters);
    if (!ready || !filters) return null;

    return (
        <>
            <SearchBar updateFilter={updateFilter} searchValue={filters.s} />
            <Filters updateFilter={updateFilter} resetFilters={resetFilters} />
            <Information />
            {loading ? (<SkeletonFiltersMessage />) : <FiltersMessage filters={filters} />}
            <Card filters={filters} />
        </>
    );
};

export default MovieSeries;