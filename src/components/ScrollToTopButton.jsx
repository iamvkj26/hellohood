import { useState, useEffect } from "react";

const ScrollToTopButton = () => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisiblity = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            };
        };
        window.addEventListener("scroll", toggleVisiblity);
        return () => window.removeEventListener("scroll", toggleVisiblity);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        isVisible && (
            <button className="btn btn-dark border rounded-circle shadow scroll-to-top" onClick={scrollToTop}>
                <i className="fa-solid fa-arrow-up text-center"></i>
            </button>
        )
    );
};

export default ScrollToTopButton;