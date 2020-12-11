<template>
	<div>
		<input-text v-if="componentData.type === 'text'"></input-text>
		<input-number v-else-if="componentData.type === 'number'"></input-number>
		<input-radio v-else-if="componentData.type === 'radio'"></input-radio>
		<input-checkbox v-else-if="componentData.type === 'checkbox'"></input-checkbox>
		<picker-date-time
			v-else-if="componentData.type === 'yyyy-MM-dd' || componentData.type === 'yyyy-MM-dd HH:mm'"
		></picker-date-time>
		<time-meter v-else-if="componentData.type === 'timer'"></time-meter>
		<upload-file-preview v-else></upload-file-preview>
	</div>
</template>

<script>
	// 该组件下的所有子组件公用一个数据，所以使用提供/注入。
	import InputText from '../InputText.vue';
	import InputNumber from "../InputNumber";
	import InputRadio from '../InputRadio.vue';
	import InputCheckbox from '../InputCheckbox.vue';
	import PickerDateTime from '../PickerDateTime.vue';
	import TimeMeter from '../TimeMeter.vue';
	import UploadFilePreview from './UploadFilePreview.vue';
	export default {
		name: 'form-item-preview',
		props: {
			componentData: {
				type: Object,
				required: true,
			},
		},
		components: {
			InputText,
			InputNumber,
			InputRadio,
			InputCheckbox,
			PickerDateTime,
			TimeMeter,
			UploadFilePreview,
		},
		provide: function() {
			return {
				elementData: this.componentData,
			};
		},
	};
</script>

<style lang="less" scoped></style>>
