import api from "./api";
import retryRequest from "./retryRequest";

const extractErrorMessage = (error) => error.response?.data?.message || error.message || "Something went wrong";

export const getMS = async (filters = {}, skip = 0, limit = 20) => {

    const { w = "", s = "", f = "", i = "", g = "" } = filters;

    try {
        const query = new URLSearchParams();

        if (w) query.append("watched", w);
        if (s) query.append("search", s);
        if (f) query.append("format", f);
        if (i) query.append("industry", i);
        if (g) query.append("genre", g);

        query.append("skip", skip);
        query.append("limit", limit);

        const response = await retryRequest(() => api.get(`/get?${query.toString()}`));
        return response.data;
    } catch (error) { throw new Error(extractErrorMessage(error)) };
};

export const getDetailsMS = async (id) => {
    try {
        const response = await retryRequest(() => api.get(`/get/details/${id}`));
        return response.data;
    } catch (error) { throw new Error(extractErrorMessage(error)) };
};

export const getAboutUs = async () => {
    try {
        const response = await api.get("/about");
        return response.data;
    } catch (error) { throw new Error(extractErrorMessage(error)) };
};

export const postContactus = async (addData) => {
    try {
        return await api.post("/contact", addData);
    } catch (error) { throw new Error(extractErrorMessage(error)) };
};