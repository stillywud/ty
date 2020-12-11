<template>
	<section>
		<div v-if="noError">
			<van-form>
				<div style="background-color: #fff;">
					<form-item-preview
							v-for="element in baseInfo.elements"
							:key="element.id"
							:componentData="element"
					></form-item-preview>
				</div>
				<van-tabs sticky>
					<van-tab v-for="item in checkGroup" :key="item.group_id" :title="item.group_name">
						<div v-for="component in item.components" :key="component.component_id" class="check_item">
							<h5>{{ component.component_name }}</h5>
							<form-item-preview
								v-for="element in component.elements"
								:key="element.id"
								:componentData="element"
							></form-item-preview>
						</div>
					</van-tab>
				</van-tabs>
			</van-form>
		</div>
		<van-empty v-else image="error" description="数据错误,请检查传入的参数是否正确" />
	</section>
</template>

<script>
	import FormItemPreview from '../components/preview/FormItemPreview.vue';
	export default {
		name: 'PreviewTemplate',
		components: {
			FormItemPreview,
		},
		data() {
			return {
				noError: true,
				baseInfo: {},
				checkGroup: [],
				otherInfo: {
					category_code: '',
					template_version: 1,
					id: '',
				},
				locationSearch: {},
			};
		},
		mounted() {
			window.addEventListener('message', this.handleMessage)
		},
		created() {
		},
		methods: {
			/**
			 * @description 通过url中的数据为baseInfo赋值.
			 */
			setBaseinfo() {
				this.baseInfo.elements.forEach((item) => {
					// item.value = this.locationSearch[item.name] || '';
					if(item.type === "text" && item.business_key !== "") {
						item.value = this.locationSearch[item.business_key] || '';
					}
				});
			},
			/**
			 * @description 获取预览数据
			 */
			handleMessage(event) {
				const data = event.data
				if(data.cmd === "previewTempJSON"){
					// 创建页面的预览
					this.locationSearch = event.data.params
					if ('templateJson' in this.locationSearch) {
						const tempData = this.locationSearch.templateJson.data;
						console.log("接收到的数据")
						console.log(tempData)
						this.checkGroup = tempData.check_group;
						this.baseInfo = tempData.base_info;
						// this.setBaseinfo(); // 预览页面不需要注入key
					} else {
						this.noError = false;
					}
				}
			}
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
