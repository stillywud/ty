<template>
	<section>
		<van-nav-bar :title="title" fixed placeholder @click-left="handleClickLeft" @click-right="handleClickRight">
			<template #right v-if="noError">
				<van-button type="primary" size="small"> 保存 </van-button>
			</template>
		</van-nav-bar>
		<div v-if="noError">
			<van-form>
<!--				<div>-->
<!--					<input-main-->
<!--						v-for="(element, index) in baseInfo.elements"-->
<!--						:key="index"-->
<!--						:elementData="element"-->
<!--					></input-main>-->
<!--				</div>-->
				<div style="background-color: #fff;">
					<form-item v-for="element in baseInfo.elements"
						:key="element.id"
						:componentData="element">
					</form-item>
				</div>
<!--				offset-top="46"-->
				<van-tabs sticky>
					<van-tab v-for="item in checkGroup" :key="item.group_id" :title="item.group_name">
						<div v-for="component in item.components" :key="component.component_id" class="check_item">
							<h5>{{ component.component_name }}</h5>
							<form-item
								v-for="element in component.elements"
								:key="element.id"
								:componentData="element"
							></form-item>
						</div>
					</van-tab>
				</van-tabs>
			</van-form>
		</div>
		<van-empty v-else image="error" description="数据错误,请检查传入的参数是否正确" />
	</section>
</template>

<script>
	import queryString from 'query-string';
	import {getComponentsTypeApi, getPatrolRecord, addPatrolRecord, updatePatrolRecord} from '../api/index';
	import {formatTime} from '../utils';
	import FormItem from '../components/FormItem.vue';
	// import InputMain from '../components/InputMain.vue';
	export default {
		name: 'home',
		components: {
			FormItem,
			// InputMain,
		},
		data() {
			return {
				noError: true,
				baseInfo: {},
				checkGroup: [],
				otherInfo: {
					category_code: '',
					template_version: 1,
					start_time: '',
					latitude: '',
					longitude: '',
					id: '',
				},
				locationSearch: {},
			};
		},
		computed: {
			title() {
				return this.otherInfo.id ? '修改巡检报告' : '填写巡检报告';
			},
		},
		created() {
			this.locationSearch = queryString.parse('?' + location.href.split('?')[1]);
			// url中必须有token
			if ('token' in this.locationSearch) {
				this.saveToken();
				this.otherInfo.start_time = formatTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');
				if ('id' in this.locationSearch) {
					this.getPreviewData();
				} else {
					this.getComponentsTypeData();
				}
			} else {
				this.noError = false;
			}
		},
		methods: {
			saveToken() {
				sessionStorage.setItem('token', this.locationSearch.token);
			},
			/**
			 * @description 点击导航左侧的返回按钮
			 */
			handleClickLeft() {},
			checkRequired() {
				let isPass = true;
				// 基本信息
				for(let i=0;i< this.baseInfo.elements.length;i++) {
					let item = this.baseInfo.elements[i];
					if(item.type === "text" && item.required != 0 ) {
						if(item.value == null || item.value === "") {
							isPass = false;
							break;
						}
					}
				}
				// 巡检信息
				if(isPass) {
					for(let i=0;i< this.checkGroup.length;i++) {
						let tab = this.checkGroup[i];
						for(let i2 =0;i2< tab.components.length;i2++ ) {
							let group = tab.components[i2];
							for(let i3 = 0;i3 < group.elements.length; i3++ ){
								let item = group.elements[i3];
								if(item.required != 0) {
									if(item.type === "checkbox" || item.type === "multipleimage" || item.type === "multiplevideo") {
										if(item.value.length === 0) {
											isPass = false;
										}
									}
									else if(item.type === "singleimage") {
										if(item.value.original == undefined || item.value.original === "") {
											isPass = false;
										}
									}
									else if (item.type === "timer") {
										if(item.value == null || item.value == 0) {
											isPass = false;
										}
									}
									else {
										if(item.value == null || item.value === "") {
											isPass = false;
										}
									}
								}
								if(!isPass){
									break;
								}
							}
							if(!isPass){
								break;
							}
						}
						if(!isPass){
							break;
						}
					}
				}
				return isPass;
			},
			/**
			 * @description 点击导航右侧的保存按钮
			 */
			async handleClickRight() {
				// 校验必填项
				if(this.checkRequired()){
					console.log("必填项检查通过");
					this.$root.curTime = Date.now();
					if (!this.otherInfo.id) {
						try {
							const {latitude, longitude} = await this.getLocation();
							this.otherInfo.latitude = latitude;
							this.otherInfo.longitude = longitude;
						} catch (err) {
							console.log(err);
						} finally {
							this.otherInfo.category_code = this.locationSearch.category_code;
						}
					}
					const params = {
						...this.otherInfo,
						data: {
							base_info: this.baseInfo,
							check_group: this.checkGroup,
						},
					};
					setTimeout(async () => {
						if (this.otherInfo.id) {
							const {message} = await updatePatrolRecord(params);
							this.$toast(message);
						} else {
							const {message} = await addPatrolRecord(params);
							this.$toast(message);
						}
					}, 50);
				}
				else {
					this.$toast("必填项不能为空!");
				}
			},

			/**
			 * @description 获取组件
			 */
			async getComponentsTypeData() {
				try {
					const {result} = await getComponentsTypeApi({
						categoryCode: this.locationSearch.category_code,
						template_version: this.locationSearch.template_version,
					});
					const {data} = result;
					this.checkGroup = data.check_group;
					this.baseInfo = data.base_info;
					this.setBaseinfo();
				} catch (error) {
					this.noError = false;
				}
			},

			/**
			 * @description 通过url中的数据为baseInfo赋值.
			 */
			setBaseinfo() {
				// 基本信息注入业务key
				this.baseInfo.elements.forEach((item) => {
					// item.value = this.locationSearch[item.name] || '';
					if(item.type === "text" && item.business_key != "") {
						item.value = this.locationSearch[item.business_key] || '';
					}
				});
				// 巡检信息注入业务key
				this.checkGroup.forEach((tab) => {
					tab.components.forEach((group) => {
						group.elements.forEach((item) => {
							// item.value = this.locationSearch[item.name] || '';
							if(item.type === "text" && item.business_key !== "") {
								item.value = this.locationSearch[item.business_key] || '';
							}
						});
					});
				});
			},
			/**
			 * @description 点击提交时需要获取当前定位
			 */
			getLocation() {
				return new Promise((resolve, reject) => {
					navigator.geolocation.getCurrentPosition(
						({coords}) => {
							resolve(coords);
						},
						(error) => {
							reject(error);
						},
						{
							enableHighAccuracy: true, // 高精度
						}
					);
				});
			},
			/**
			 * @description 获取要修改的数据
			 */
			async getPreviewData() {
				try {
					const res = await getPatrolRecord({
						id: this.locationSearch.id,
					});
					const {category_code, id, latitude, longitude, start_time, template_version, data} = res.result;
					this.otherInfo = {
						category_code,
						id,
						latitude,
						longitude,
						start_time,
						template_version,
					};
					this.baseInfo = data.base_info;
					this.checkGroup = data.check_group;
				} catch (error) {
					console.log(error);
					this.noError = false;
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.check_item {
		background-color: #fff;
		margin-top: 6px;
		> h5 {
			margin: 0;
			padding: 9px 16px;
			border-bottom: 1px solid #ebedf0;
		}
	}
</style>
