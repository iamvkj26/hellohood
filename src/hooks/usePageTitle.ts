import { useEffect } from "react";

const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = title ? `${title} - HelloHood` : "HelloHood";
    }, [title]);
};

export default usePageTitle;