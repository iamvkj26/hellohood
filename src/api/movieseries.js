import api from "./api";
import retryRequest from "./retryRequest";

const extractErrorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong";

export const getMS = async (filters = {}) => {

    const { w = "", s = "", f = "", i = "", g = "" } = filters;

    try {
        const query = new URLSearchParams();

        if (w) query.append("watched", w);
        if (s) query.append("search", s);
        if (f) query.append("format", f);
        if (i) query.append("industry", i);
        if (g) query.append("genre", g);

        const response = await retryRequest(() => api.get(`/get?${query.toString()}`));
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};

export const getDetailsMS = async (id) => {
    try {
        const response = await api.get(`/get/details/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        throw new Error(extractErrorMessage(error));
    };
};