import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export type Filters = {
    w: string;
    s: string;
    f: string;
    i: string;
    g: string;
    c: string;
};

const defaultFilters: Filters = { w: "", s: "", f: "", i: "", g: "", c: "" };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [ready, setReady] = useState(false);

    const isHome = location.pathname === "/";

    useEffect(() => {
        const params = Object.fromEntries(new URLSearchParams(location.search)) as Partial<Filters>;
        setFilters({ ...defaultFilters, ...params });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!ready || !isHome) return;
        const params = new URLSearchParams(Object.entries(filters).filter(([, v]) => v));
        navigate({ search: params.toString() }, { replace: true });
    }, [filters, ready, isHome, navigate]);

    const updateFilter = (key: keyof Filters, value: string) => {
        const newFilters: Filters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (!isHome) {
            const params = new URLSearchParams(Object.entries(newFilters).filter(([, v]) => v));
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