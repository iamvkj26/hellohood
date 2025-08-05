import { toast } from "react-hot-toast";

const retryRequest = async (fn, retries = 3, delay = 1000) => {

    let toastId = null;

    for (let i = 0; i < retries; i++) {
        try {
            if (toastId) toast.dismiss(toastId);
            return await fn();
        } catch (error) {
            if (!error.response) {
                if (i < retries - 1) {
                    toastId = toast.loading(`Retrying... (${i + 1}/${retries})`, {
                        id: "retry-toast",
                        duration: delay,
                    });
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    toast.dismiss("retry-toast");
                    throw new Error("Network error after multiple retries. Please try again later.");
                }
            } else {
                throw error;
            };
        };
    };
};

export default retryRequest;