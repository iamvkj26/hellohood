export { };

declare global {
    interface Window {
        bootstrap: {
            Collapse: {
                new(element: HTMLElement, options?: { toggle?: boolean }): {
                    toggle: () => void;
                    show: () => void;
                    hide: () => void;
                };
                getInstance: (element: HTMLElement) => {
                    toggle: () => void;
                    show: () => void;
                    hide: () => void;
                } | null;
            };
        };
    };
};