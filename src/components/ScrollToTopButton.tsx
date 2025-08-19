import { useState, useEffect } from "react";

const ScrollToTopButton = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 300);

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (!isVisible) return null;

    return (
        <button className="btn btn-dark border rounded-circle shadow scroll-to-top" onClick={scrollToTop}>
            <i className="fa-solid fa-arrow-up text-center"></i>
        </button>
    );
};

export default ScrollToTopButton;