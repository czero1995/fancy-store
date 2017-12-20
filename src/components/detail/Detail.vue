<template>
	<div>
		<img :src="goods.GoodsImage" class="goodsImg"/>
		<p>{{goods.GoodsName}}</p>
	</div>

</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				'goods'
			])
		},
		created(){
			console.log(1,this.goods)
		},
		methods:{
//			selectItem(item){
//				console.log(item);
//			}
		}
	}
</script>

<style>
	.goodsImg{
		width: 100%;
		height: 5rem;
	}
</style>