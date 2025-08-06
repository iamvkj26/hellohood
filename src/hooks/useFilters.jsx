import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const defaultFilters = { w: "false", s: "", f: "", i: "", g: "", };

const useFilters = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [filters, setFilters] = useState(defaultFilters);
    const [ready, setReady] = useState(false);

    const isHome = location.pathname === "/";

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setFilters({
            w: params.get("w") || "false",
            s: params.get("s") || "",
            f: params.get("f") || "",
            i: params.get("i") || "",
            g: params.get("g") || ""
        });
        setReady(true);
    }, [location.search]);

    useEffect(() => {
        if (!filters || !isHome) return;

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && key) params.set(key, value);
        });

        navigate({ search: params.toString() }, { replace: true });
    }, [filters, isHome, navigate]);

    const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

    const resetFilters = () => setFilters({ ...defaultFilters });

    const goToHomeWithFilter = (key, value) => {
        const params = new URLSearchParams({ ...setFilters, [key]: value });
        navigate(`/?${params.toString()}`);
    };

    return { filters, ready, updateFilter, resetFilters, goToHomeWithFilter };
};

export default useFilters;