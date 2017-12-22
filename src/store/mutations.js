import * as types from './mutation-types'
const cartArr =[];
const matutaions = {
	[types.SET_GOODS](state,goods){
		state.goods = goods;
	},
	[types.SET_CARTS](state,carts){
		cartArr.push(carts);
		state.carts = cartArr;
		console.log('state.carts',state.carts)
	},
	[types.SET_ORDERS](state,orders){
		state.orders = orders;
		console.log('state.orders',state.orders)
	},
	[types.SET_PAYS](state,pays){
		state.pays = pays;
		console.log('state.pays',state.pays)
	},
	[types.SET_ADDRESS](state,address){
		state.address = address;
		console.log('state.address',state.address)
	},

}
 export default matutaions