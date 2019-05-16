import * as types from "./mutation-types";
const matutaions = {
    [types.SET_ORDERS](state, orders) {
        state.orders = orders;
    },
    [types.SET_ORDERS_STATUS](state, orderStatus) {
        state.orderStatus = orderStatus;
    },
    [types.SET_USER](state, user) {
        state.user = user;
    },
    [types.SET_ADDRESS](state, address) {
        state.address = address;
    },
    [types.SET_ADDRESS_STATUS](state, addressStatus) {
        state.addressStatus = addressStatus;
    },
    [types.SET_RESET](state) {
        state.carts = [];
        state.user = {};
        state.cartsLength = 0;
        state.orderStatus = "paying";
        state.orders = [];
        state.addressStatus = "";
        state.address = {};
    }
};
export default matutaions;
