import axios from "../utils/axios";

export function apiGetCategoryMenu() {
    return axios.get(`category/all`);
}
