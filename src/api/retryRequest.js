import { toast } from "react-hot-toast";

const retryRequest = async (fn, retries = 3, delay = 500) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.response) throw error;
            if (i < retries - 1) {
                toast.loading(`Retrying... (${i + 1}/${retries})`, { id: "retry" });
                await new Promise(res => setTimeout(res, delay * (i + 1)));
            } else {
                toast.dismiss("retry");
                throw new Error("Network error. Please try again later.");
            };
        };
    };
};

export default retryRequest;