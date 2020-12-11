<template>
	<div class="radio_box">
		<label v-if="elementData.required != 0" class="ext_requried">*</label>
		<van-radio-group v-model="elementData.value">
			<van-radio
				class="has_margin"
				v-for="(item,index) in elementData.options"
				:key="item.id"
				:name="index"
				icon-size="16px"
			>
				{{ item.name }}
			</van-radio>
		</van-radio-group>
	</div>
</template>

<script>
import formItemMixin from '../mixin/index';
export default {
	name: 'input-radio',
	mixins: [formItemMixin],
};
</script>

<style lang="less" scoped>
.radio_box {
	padding: 4px 16px;
	border-bottom: 1px solid #ebedf0;
	font-size: 14px;
}

.ext_requried {
	color: red;
	vertical-align: bottom;
	margin-bottom: -10px;
	display: block;
}

.has_margin {
	margin: 12px 0;
}
</style>
