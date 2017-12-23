import * as types from './mutation-types'
const cartArr =[];
const addressArr = [];
const matutaions = {
	[types.SET_GOODS](state,goods){
		state.goods = goods;
	},
	[types.SET_CARTS](state,carts){
		cartArr.push(carts);
		state.carts = cartArr;
	},
	[types.SET_ORDERS](state,orders){
		state.orders = orders;
	},
	[types.SET_PAYS](state,pays){
		state.pays = pays;
	},
	[types.SET_ADDRESS](state,address){
		addressArr.push(address);
		state.address = addressArr;
	},
	[types.SET_CHOOSEADDRESS](state,chooseaddress){
		state.chooseaddress = chooseaddress;
	},	
	[types.SET_ISCHOOSE](state,ischoose){
		state.ischoose = ischoose;
	},	
	[types.SET_TABINDEX](state,tabindex){
		state.tabindex = tabindex;
	},

}
 export default matutaions