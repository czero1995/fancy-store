<template>

	<div class="page">
		<headersec tabname="添加地址"></headersec>
		<transition :name="slidename">
			<div class="container" v-show="mainarea">
				<input type="text" placeholder="选择地区" :value="addressText" readonly="" @click="addressModel = true" />

				<div class="model" v-show="addressModel" @click="addressModel = false">
					<div class="model-content" @click.stop="addressModel = true">
						<div class="addressBox">
							<ul>
								<li v-for="(provinceItem,provinceIndex) in addressList" @click.stop="onProvinceSelect(provinceIndex,provinceItem.text)" :class="{active: provinceIndex === activeProvince}">
									<span>{{provinceItem.text}}</span>
									<div class="cityBox">
										<ul>
											<li v-for="(cityItem,cityIndex) in provinceItem.children" @click.stop="onCitySelect(cityIndex,cityItem.text)" :class="{active: cityIndex === activeCity}">
												<span>{{cityItem.text}}</span>
												<div class="areaBox">
													<ul>
														<li v-for="(areaItem,areaIndex) in cityItem.children" @click.stop="onAreaSelect(areaIndex,areaItem.text)" :class="{active: areaIndex == activeArea}">
															<span>{{areaItem.text}}</span>
														</li>
													</ul>
												</div>
											</li>
										</ul>
									</div>
								</li>
							</ul>

						</div>
					</div>
				</div>

			</div>
		</transition>
		<div class="pageBottom" @click="onSave">
			<span class="tabbar-label">保存</span>
		</div>
	</div>

</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import init_city_picker from '../../../static/js/data.city.js';
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				addressModel: false,
				addressList: [],
				province: '',
				city: '',
				area: '',
				addressText: '请选择',
				activeProvince: 0,
				activeCity: 0,
				activeArea: 0,
				mainarea: false,
				slidename: 'slide-go'
			}
		},
		components: {
			Headersec
		},
		computed: {
			...mapGetters([
				'this.$store.state.comname'
			])
		},
		mounted() {
			const that = this;
			that.mainarea = true;
			that.addressList = init_city_picker;
			this.setComname('addressadd');
		},

		methods: {
			/*选择省份*/
			onProvinceSelect: function(index, item) {
				var that = this;
				that.activeProvince = index;
				that.province = item;
				that.addressText = that.province;

			},
			/*选择城市*/
			onCitySelect: function(index, item) {
				var that = this;
				that.activeCity = index;
				that.city = item
				that.addressText = that.province + " " + that.city;

			},
			/*选择区域*/
			onAreaSelect: function(index, item) {
				var that = this;
				that.activeArea = index;
				that.area = item
				that.addressText = that.province + " " + that.city + " " + that.area;
				that.addressModel = false;
			},
			/*保存地址*/
			onSave() {
				this.setAddress(this.addressText);
				this.$router.back();

			},
			...mapMutations({
				setAddress: 'SET_ADDRESS',
				setComname: 'SET_COMNAME'
			})
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.addressBox {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5.1rem;
		z-index: 9;
		background: #f5f5f5;
		display: block!important;
	}

	.addressBox ul {
		width: 33%;
		height: 5.1rem;
		background: @base_color;
		overflow-y: scroll;
		overflow-x: auto;
	}

	.addressBox li {
		font-size: .26rem;
		height: 0.62rem;
		line-height: 0.62rem;
		color: @base_textColor;
		text-align: left;
		padding-left: .5rem;
	}

	.cityBox {
		position: absolute;
		top: 0;
		left: 33%;
		width: 100%;
		height: 5.1rem;
		display: none;
		overflow-y: scroll;
		z-index: 19;
		-webkit-overflow-scrolling: touch;
		overflow-x: auto;
	}

	.cityBox ul {
		width: 100%;
		height: 5.1rem;
	}

	.cityBox li {
		padding-left: 0.17rem;
		text-align: left;
		border-bottom: 0.01rem solid #e6e6e6;
	}

	.areaBox {
		position: absolute;
		top: 0;
		left: 33%;
		width: 33%;
		height: 5.1rem;
		display: none;
		overflow-y: scroll;
		z-index: 9999;
		-webkit-overflow-scrolling: touch;
	}

	.model-content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: .15rem;
		margin: auto;
		background-color: #ffffff;
		text-align: center;
	}

	input {
		font-size: 0.32rem;
		width: 100%;
		text-align: center;
		margin-top: .3rem;
		border: 1px solid #ccc;
	}
	/*点击省份，出现城市*/

	.addressBox .active {
		background: @theme_background;
		color: @base_color;
	}

	.addressBox .active .cityBox {
		display: block;
	}
	/*点击城市，出现区域*/

	.cityBox .active {
		background: @theme_background;
	}

	.cityBox .active .areaBox {
		display: block;
	}

	.pageBottom {
		position: fixed;
		bottom: 0;
		background: @theme_background;
		width: 100%;
		height: .8rem;
		line-height: .8rem;
		color: @base_color;
		font-size: .28rem;
		text-align: center;
	}
</style>
