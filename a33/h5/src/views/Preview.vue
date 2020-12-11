<template>
	<section>
		<van-nav-bar v-if="showTitleBar" title="巡检报告" left-text="返回" left-arrow @click-left="handleClickLeft" />
		<div v-if="noError">
			<div class="base_info">
				<van-cell-group>
					<van-cell title="巡检编号" :value="previewData.category_code" />
					<van-cell title="巡检时间" :value="previewData.start_time" />
				</van-cell-group>
				<div class="equipment_info">
					<div v-for="(item, index) in equipmentInfo" :key="index">
						<span>{{ item.title }}</span>
						<span class="equipment_info_value">{{ item.value }}</span>
					</div>
				</div>
			</div>
			<div class="group_info" v-for="(group, index) in groupInfo" :key="index">
				<h4>{{ group.group_name }}</h4>
				<div class="component_info" v-for="(component, i) in group.components" :key="i">
					<h5 class="info_title">{{ component.component_name }}</h5>
					<div>
						<ul class="info_list">
							<li v-for="(item, j) in component.label" :key="j">
								{{ Array.isArray(item) ? item.join() : item }}
							</li>
						</ul>
						<div
							class="media_area"
							v-if="component.imgUrl.length"
							@click="handlePreviewMedia([...component.imgUrl, ...component.videoUrl])"
						>
							<img :src="$addSrcPrefix(component.imgUrl[0].thumbnail)" alt="" />
							<span>{{ component.imgUrl.length + component.videoUrl.length }}张</span>
						</div>
						<div
							class="media_area"
							v-else-if="component.videoUrl.length"
							@click="handlePreviewMedia([...component.imgUrl, ...component.videoUrl])"
						>
							<video :src="$addSrcPrefix(component.videoUrl[0])"></video>
							<span>{{ component.imgUrl.length + component.videoUrl.length }}张</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<van-empty v-else image="error" description="数据错误,请检查传入的参数是否正确" />
		<van-overlay :show="show" @click="handleHideSwipe">
			<div class="wrapper">
				<van-swipe ref="swipe" @change="onChange">
					<van-swipe-item class="preview_swipe_item" v-for="(item, index) in curMediaData" :key="index">
						<div class="show_media_box">
							<img v-if="item.type === 'image'" :src="$addSrcPrefix(item.url)" alt="" />
							<video-show v-else :url="$addSrcPrefix(item.url)" :videoTime="videoTime"></video-show>
						</div>
						<div v-if="!showTitleBar" class="arrow arrow_left" @click.stop="handleSwipeChange(-1)">
							<van-icon name="arrow-left" size="36" color="#000" />
						</div>
						<div v-if="!showTitleBar" class="arrow arrow_right" @click.stop="handleSwipeChange(1)">
							<van-icon name="arrow" size="36" color="#000" />
						</div>
					</van-swipe-item>
				</van-swipe>
			</div>
		</van-overlay>
	</section>
</template>

<script>
	import queryString from 'query-string';
	import {getPatrolRecord} from '../api';
	import VideoShow from '../components/VideoShow.vue';
	export default {
		name: 'preview',
		components: {
			VideoShow,
		},
		data() {
			return {
				previewData: {},
				curMediaData: [],
				show: false,
				showTitleBar: true,
				locationSearch: {},
				noError: true,
				videoTime: 0,
			};
		},
		computed: {
			equipmentInfo() {
				if (this.previewData.data) {
					return this.previewData.data.base_info.elements.filter(function (item) {
						return item.type === 'text'
					});
				} else {
					return [];
				}
			},
			groupInfo() {
				if (this.previewData.data) {
					// 对返回的数据进行处理。
					return this.previewData.data.check_group.map((group) => {
						return {
							...group,
							components: {
								...group.components.map((component) => {
									return {
										...component,
										label: component.elements
											.filter((element) => {
												return !(
													element.type === 'singleimage' ||
													element.type === 'singlevideo' ||
													element.type === 'multipleimage' ||
													element.type === 'multiplevideo'
												);
											})
											.reduce((pre, cur) => {
												// 当value 是一个数组时（element.type === 'checkbox'）。
												const labelArr = [];
												const {value, options, name} = cur;
												if (Array.isArray(value)) {
													if (value.length !== 0) {
														const checkboxVal = [];
														value.forEach((i) => {
															options.forEach((j) => {
																if (i == j.id) {
																	checkboxVal.push(j.name);
																}
															});
														});
														labelArr.push(checkboxVal);
													}
												} else {
													if (value) {
														if (options) {
															options.forEach((j) => {
																if (value === j.id) {
																	labelArr.push(j.name);
																}
															});
														} else {
															if (name) {
																labelArr.push(`${name}:${value}`);
															}
														}
													}
												}
												return pre.concat(labelArr);
											}, []),
										imgUrl: component.elements
											.filter(
												(element) =>
													element.type === 'singleimage' || element.type === 'multipleimage'
											)
											.reduce((pre, cur) => {
												const imgUrlArr = [];
												const {value} = cur;
												if (Array.isArray(value)) {
													if (value.length !== 0) {
														imgUrlArr.push(...value);
													}
												} else {
													// 排除是空对象的
													if (Object.keys(value).length !== 0) {
														imgUrlArr.push(value);
													}
												}
												return pre.concat(imgUrlArr);
											}, []),
										videoUrl: component.elements
											.filter(
												(element) =>
													element.type === 'singlevideo' || element.type === 'multiplevideo'
											)
											.reduce((pre, cur) => {
												const imgUrlArr = [];
												const {value} = cur;
												if (Array.isArray(value)) {
													if (value.length !== 0) {
														imgUrlArr.push(...value);
													}
												} else {
													// 排除是空对象的
													if (Object.keys(value).length !== 0) {
														imgUrlArr.push(value);
													}
												}
												return pre.concat(imgUrlArr);
											}, []),
									};
								}),
							},
						};
					});
				} else {
					return [];
				}
			},
		},
		created() {
			this.locationSearch = queryString.parse('?' + location.href.split('?')[1]);
			if ('showTitleBar' in this.locationSearch) {
				this.showTitleBar = Number(this.locationSearch.showTitleBar);
			}
			if ('token' in this.locationSearch) {
				this.saveToken();
				this.getPreviewData();
			}
		},

		methods: {
			saveToken() {
				sessionStorage.setItem('token', this.locationSearch.token);
			},
			handleClickLeft() {},
			async getPreviewData() {
				try {
					const {result} = await getPatrolRecord({
						id: this.locationSearch.id,
					});
					this.previewData = result;
				} catch (error) {
					this.noError = false;
				}
			},
			handlePreviewMedia(mediaData) {
				this.curMediaData = mediaData.map((item) => {
					if (item.thumbnail) {
						return {
							url: item.original,
							type: 'image',
						};
					} else {
						return {
							url: item,
							type: 'video',
						};
					}
				});
				this.show = true;
			},
			handleSwipeChange(index) {
				console.log(index);
				const swipe = this.$refs.swipe;
				if (index > 0) {
					swipe.next();
				} else {
					swipe.prev();
				}
			},
			/**
			 * @description 当切换视频swiper时 视频暂停
			 */
			onChange() {
				this.videoTime = Date.now();
			},
			handleHideSwipe() {
				this.videoTime = Date.now();
				this.show = false;
			},
		},
	};
</script>

<style lang="less" scoped>
	.base_info {
		background-color: #fff;
	}
	.equipment_info {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		> div {
			display: flex;
			flex-direction: column;
			width: 33.3333%;
			> span {
				margin: -0.5px;
				border: 0.5px solid #ebedf0;
				line-height: 34px;
			}
		}
	}
	.equipment_info_value {
		color: #969799;
	}
	.group_info {
		background-color: #fff;
		> h4 {
			padding: 6px 16px;
			margin-bottom: 0;
			margin-top: 6px;
		}
	}
	.component_info {
		padding: 6px 16px;
		border-top: 1px solid #ebedf0;
		> div {
			display: flex;
			justify-content: space-between;
		}
	}
	.info_title {
		margin: 6px 0;
	}
	.info_list {
		font-size: 14px;
		color: #969799;
		> li {
			height: 24px;
		}
	}
	.media_area {
		width: 120px;
		height: 80px;
		border: 0.5px solid #ebedf0;
		border-radius: 4px;
		align-self: flex-end;
		overflow: hidden;
		position: relative;
		> img {
			height: 100%;
			width: 100%;
		}
		> video {
			height: 80px;
			width: 120px;
			object-fit: cover;
		}
		> span {
			font-size: 14px;
			background-color: #f2f3f5;
			padding: 0 6px;
			position: absolute;
			bottom: 0;
			right: 0;
		}
	}
	.wrapper {
		height: 100%;
	}
	.show_media_box {
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		> img {
			width: 100%;
			max-height: 100%;
			object-fit: contain;
		}
	}
	.preview_swipe_item {
		position: relative;
	}
	.arrow {
		position: absolute;
		top: 50%;
		margin-top: -18px;
		z-index: 2;
		width: 36px;
		height: 36px;
	}
	.arrow_left {
		left: 10%;
	}
	.arrow_right {
		right: 10%;
	}
</style>
