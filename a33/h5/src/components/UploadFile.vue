<template>
	<div class="upload_file">
		<label v-if="elementData.required != 0" class="ext_requried">*</label>
		<van-uploader
			v-model="fileList"
			:accept="accept"
			:before-read="beforeRead"
			:max-count="maxCount"
			:max-size="maxSize"
			:after-read="afterRead"
			@delete="handleDelete"
			@oversize="onOversize"
		>
			<template #preview-cover="{url}" v-if="!isImg">
				<div class="preview_cover">
					<video :src="url" @click="handlePreviewVideo"></video>
				</div>
			</template>
		</van-uploader>
	</div>
</template>

<script>
	import imageConversion from 'image-conversion';
	import formItemMixin from '../mixin/index';
	import {uploadPatrolImage, uploadPatrolVideo} from '../api/index';
	import {changeImgSize} from '../utils';
	export default {
		name: 'upload-file',
		mixins: [formItemMixin],
		data() {
			return {
				fileList: [],
			};
		},
		computed: {
			isMulti() {
				return !(this.elementData.type.indexOf('single') > -1);
			},
			isImg() {
				return this.elementData.type.indexOf('image') > -1;
			},
			maxCount() {
				if(this.isMulti) {
					if(this.isImg) {
						if(this.elementData.max_count != null) {
							return this.elementData.max_count;
						}
						else {
							return 9;
						}
					}
					else {
						if(this.elementData.max_count != null) {
							return this.elementData.max_count;
						}
						else {
							return 3;
						}
					}
				}
				else {
					return 1;
				}
				// return this.isMulti ? 3 : 1;
			},
			accept() {
				return this.isImg ? 'image/*' : 'video/*';
			},
			maxSize() {
				if(this.elementData.max_size != null) {
					return 1024*1024*this.elementData.max_size;
				}
				return Number.MAX_SAFE_INTEGER;
			}
		},
		created() {
			this.getShowList();
		},
		methods: {
			/**
			 * @description 获取回显数据
			 */
			getShowList() {
				const {value} = this.elementData;
				let showList;
				if (this.isImg) {
					if (this.isMulti) {
						showList = value.map((item) => {
							return {
								url: this.$addSrcPrefix(item.original),
							};
						});
					} else {
						showList = [
							{
								url: this.$addSrcPrefix(value.original),
							},
						];
					}
				} else {
					if (this.isMulti) {
						showList = value.map((item) => {
							return {
								url: this.$addSrcPrefix(item),
							};
						});
					} else {
						showList = [
							{
								url: this.$addSrcPrefix(value),
							},
						];
					}
				}
				this.fileList = showList.filter((item) => item.url);
			},
			/**
			 * @description 上传前的格式验证
			 */
			beforeRead(file) {
				if (this.isImg) {
					if (file.type.indexOf('image') > -1) {
						return true;
					}
					this.$toast('请上传图片');
					return false;
				} else {
					if (file.type.indexOf('video') > -1) {
						return true;
					}
					this.$toast('请上传视频');
					return false;
				}
			},
			/**
			 * @description 对file进行预处理
			 */
			async afterRead(file) {
				const limtSize = 1024 * 1024;
				file.status = 'uploading';
				file.message = '上传中...';
				if (this.isImg) {
					const fileBlob = await changeImgSize(file.file);
					if (fileBlob.size > limtSize) {
						const res = await imageConversion.compressAccurately(fileBlob, 90);
						this.uploadFile(file, res);
					} else {
						this.uploadFile(file, fileBlob);
					}
				} else {
					this.uploadFile(file, file.file);
				}
			},
			/**
			 * @description 上传文件
			 */
			async uploadFile(fileObj, file) {
				let res;
				const config = {
					headers: {'Content-Type': 'multipart/form-data'},
				};
				const forms = new FormData();
				forms.append('uploadFiles', file);
				if (this.isImg) {
					res = await uploadPatrolImage(forms, config);
				} else {
					res = await uploadPatrolVideo(forms, config);
				}
				const {result} = res;
				fileObj.status = 'done';
				fileObj.message = '';

				// 多个上传的value为数组，单个上传的为 sting.
				if (this.isMulti) {
					this.elementData.value.push(result[0]);
					if (!this.isImg) {
						fileObj.url = this.$addSrcPrefix(result[0]);
					}
				} else {
					this.elementData.value = result[0];
					if (!this.isImg) {
						this.fileList = [
							{
								url: this.$addSrcPrefix(result[0]),
							},
						];
					}
				}
			},
			/**
			 * @description 删除文件预览时触发的事件
			 */
			handleDelete(file, detail) {
				if (this.isMulti) {
					this.elementData.value.splice(detail.index, 1);
				} else {
					this.elementData.value = '';
				}
			},
			handlePreviewVideo() {
				this.$toast('视频不能预览');
			},
			onOversize(file) {
				console.log(file);
				this.$toast('文件大小不能超过 ' + this.elementData.max_size + 'MB');
			},
		},
	};
</script>

<style lang="less" scoped>
	.upload_file {
		padding: 8px 16px 0;
		border-bottom: 1px solid #ebedf0;
	}

	.ext_requried {
		color: red;
		vertical-align: bottom;
		display: block;
	}

	.preview_cover {
		overflow: hidden;
		width: 100%;
		height: 100%;
		> video {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>
