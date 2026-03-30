import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";

export type Filters = {
    f: string;
    i: string;
    w: string;
    s: string;
    g: string;
    c: string;
    o: string;
};

const defaultFilters: Filters = { f: "", i: "", w: "", s: "", g: "", c: "", o: "" };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState<Filters>(defaultFilters);
    const [ready, setReady] = useState(false);

    const isHome = location.pathname === "/";

    useEffect(() => {
        const paramsObj: Partial<Filters> = {};
        searchParams.forEach((value, key) => paramsObj[key as keyof Filters] = value);
        setFilters({ ...defaultFilters, ...paramsObj });
        setReady(true);
    }, [searchParams]);

    useEffect(() => {
        if (!ready || !isHome) return;
        const params: Record<string, string> = {};
        Object.entries(filters).forEach(([k, v]) => {
            if (v) params[k] = v;
        });
        setSearchParams(params);
    }, [filters, ready, isHome, setSearchParams]);

    const updateFilter = (key: keyof Filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        if (!isHome) {
            const params = new URLSearchParams(Object.entries(newFilters).filter(([, v]) => v));
            navigate(`/?${params}`);
        };
    };

    const resetFilters = () => {
        setFilters(defaultFilters);
        setSearchParams({});
        if (!isHome) navigate("/");
    };

    return { filters, ready, updateFilter, resetFilters };
};

export default useFilters;