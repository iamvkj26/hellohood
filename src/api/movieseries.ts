import api from "./api";
import retryRequest from "./retryRequest";
import type { AxiosResponse } from "axios";
import type { Filters, MovieSeriesGroupedResponse, MovieSeriesDetailsResponse, AboutUsTypeResponse, ContactFormData } from "../types";

const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        return err.response?.data?.message || "Something went wrong";
    };
    return "Something went wrong";
};

export const getMS = async (filters: Partial<Filters> = {}, skip = 0, limit = 20): Promise<AxiosResponse<MovieSeriesGroupedResponse>> => {

    const { w = "", s = "", f = "", i = "", g = "" } = filters;
    try {
        const query = new URLSearchParams();
        if (w) query.append("watched", w);
        if (s) query.append("search", s);
        if (f) query.append("format", f);
        if (i) query.append("industry", i);
        if (g) query.append("genre", g);

        query.append("skip", skip.toString());
        query.append("limit", limit.toString());

        return await retryRequest(() => api.get<MovieSeriesGroupedResponse>(`/get?${query.toString()}`));
    } catch (error: unknown) {
        throw new Error(extractErrorMessage(error));
    };
};

export const getDetailsMS = async (id: string): Promise<AxiosResponse<MovieSeriesDetailsResponse>> => {
    try {
        return await retryRequest(() => api.get<MovieSeriesDetailsResponse>(`/get/details/${id}`));
    } catch (error: unknown) {
        throw new Error(extractErrorMessage(error));
    };
};

export const getAboutUs = async (): Promise<AxiosResponse<AboutUsTypeResponse>> => {
    try {
        return await api.get<AboutUsTypeResponse>("/about");
    } catch (error: unknown) {
        throw new Error(extractErrorMessage(error));
    };
};

export const postContactus = async (addData: ContactFormData) => {
    try {
        return await api.post("/contact", addData);
    } catch (error: unknown) {
        throw new Error(extractErrorMessage(error));
    };
};