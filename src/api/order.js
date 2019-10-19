import axios from "../utils/axios";

export function apiAddOrder(productIds, address, price, status) {
    return axios.post(`order/add`, {
        productIds: productIds,
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
export function apiUpdateOrder(uid, status) {
    console.log("uid", uid);
    return axios.post(`order/update`, {
        uid: uid,
        params: { status }
    });
}
