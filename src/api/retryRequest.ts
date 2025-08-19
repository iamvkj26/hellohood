import { toast } from "react-hot-toast";
import type { AxiosResponse } from "axios";

const retryRequest = async <T>(fn: () => Promise<AxiosResponse<T>>, retries = 3, delay = 500): Promise<AxiosResponse<T>> => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error: unknown) {
            if (typeof error === "object" && error !== null && "response" in error) throw error;
            if (i < retries - 1) {
                toast.loading(`Retrying... (${i + 1}/${retries})`, { id: "retry" });
                await new Promise((res) => setTimeout(res, delay * (i + 1)));
            } else {
                toast.dismiss("retry");
                throw new Error("Network error. Please try again later.");
            };
        };
    };
    throw new Error("Unknown error in retryRequest");
};

export default retryRequest;