import axios from "../utils/axios";

export function apiAddAddress(addressInfo) {
    return axios.post(`address/add`, {
        addressInfo
    });
}
export function apiUpdateAddress(addressInfo, id) {
    return axios.post(`address/update?id=${id}`, {
        addressInfo
    });
}
export function apiGetAddress() {
    return axios.get(`address/all`);
}
export function apiDeleteAddress(id) {
    return axios.post(`address/delete`, {
        id: id
    });
}
