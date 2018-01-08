import * as types from './mutation-types'
const cartArr =[];
const addressArr = [];
const matutaions = {
	/*商品详情*/
	[types.SET_GOODS](state,goods){
		state.goods = goods;
	},
	/*购物车*/
	[types.SET_CARTS](state,carts){
		cartArr.push(carts);
		state.carts = cartArr;
	},
	/*订单*/
	[types.SET_ORDERS](state,orders){
		state.orders = orders;
	},
	/*支付*/
	[types.SET_PAYS](state,pays){
		state.pays = pays;
	},
	/*地址*/
	[types.SET_ADDRESS](state,address){
		addressArr.push(address);
		state.address = addressArr;
	},
	/*选择地址*/
	[types.SET_CHOOSEADDRESS](state,chooseaddress){
		state.chooseaddress = chooseaddress;
	},	
	/*购物地址*/
	[types.SET_ISCHOOSE](state,ischoose){
		state.ischoose = ischoose;
	},
	/*组件下标*/
	[types.SET_TABINDEX](state,tabindex){
		state.tabindex = tabindex;
	},
	/*组件名字*/
	[types.SET_COMNAME](state,comname){
		state.comname = comname;
	},
	/*当前订单状态下标*/
	[types.SET_ORDERCUR](state,ordercur){
		state.ordercur = ordercur;
	},
	/*订单状态下标*/
	[types.SET_ORDERTAB](state,ordertab){
		state.ordertab = ordertab;
	}

}
 export default matutaions