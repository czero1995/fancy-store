import axios from "../utils/axios";

export function apiAddOrder(id, address, price, status) {
    return axios.post(`order/add`, {
        id: id,
        address: address,
        price: price,
        status: status
    });
}

export function apiGetOrder(status) {
    return axios.get(`order/all?status=${status}`);
}

export function apiDeleteOrder(id) {
    return axios.post(`order/delete`, {
        id: id
    });
}
export function apiUpdateOrder(id, status) {
    return axios.post(`order/update`, {
        id: id,
        status: status
    });
}
