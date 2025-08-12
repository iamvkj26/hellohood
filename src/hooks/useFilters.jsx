import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const defaultFilters = { w: "", s: "", f: "", i: "", g: "", };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState(defaultFilters);
    const [ready, setReady] = useState(false);

    const isHome = location.pathname === "/";

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(location.search));
        setFilters({ ...defaultFilters, ...params });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!ready || !isHome) return;
        const params = new URLSearchParams(
            Object.entries(filters).filter(([, v]) => v)
        );
        navigate({ search: params.toString() }, { replace: true });
    }, [filters, ready, isHome, navigate]);

    const updateFilter = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (!isHome) {
            const params = new URLSearchParams(
                Object.entries(newFilters).filter(([, v]) => v)
            );
            navigate(`/?${params}`);
        };
    };

    const resetFilters = () => {
        setFilters(defaultFilters);
        if (!isHome) navigate("/");
    };

    return { filters, ready, updateFilter, resetFilters };
};

export default useFilters;