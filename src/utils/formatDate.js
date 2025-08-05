import moment from "moment";

/**
 * @param {string|Date} date
 * @param {boolean} withTime
 * @returns {string}
 */

export const formatDate = (date, withTime = false) => {
    if (!date) return "N/A";
    return moment(date).format(withTime ? "DD MMMM YYYY hh:mm A" : "DD MMMM YYYY");
};