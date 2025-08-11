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
        const params = new URLSearchParams(location.search);
        setFilters({
            w: params.get("w") || "",
            s: params.get("s") || "",
            f: params.get("f") || "",
            i: params.get("i") || "",
            g: params.get("g") || ""
        });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!ready || !isHome) return;

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
        });

        navigate({ search: params.toString() }, { replace: true });
    }, [ready, isHome, filters, navigate]);

    const updateFilter = (key, value) => {
        const updatedFilters = { ...filters, [key]: value };
        setFilters(updatedFilters);
        if (!isHome) {
            const params = new URLSearchParams();
            Object.entries(updatedFilters).forEach(([k, v]) => {
                if (v) params.set(k, v);
            });
            navigate(`/?${params.toString()}`);
        };
    };

    const resetFilters = () => {
        setFilters(defaultFilters);
        if (!isHome) {
            navigate(`/`);
        }
    };

    return { filters, ready, updateFilter, resetFilters };
};

export default useFilters;