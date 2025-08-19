import moment from "moment";

/**
 * Format a date string or Date object.
 * @param date - The date to format (string or Date)
 * @param withTime - Whether to include time in the output
 * @returns Formatted date string
 */

export const formatDate = (date: string | Date | undefined | null, withTime = false): string => {
    if (!date) return "N/A";
    return moment(date).format(withTime ? "DD MMMM YYYY hh:mm A" : "DD MMMM YYYY");
};