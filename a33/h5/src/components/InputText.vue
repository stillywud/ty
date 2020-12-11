<template>
	<van-cell-group>
		<van-field
			:required="elementData.required != 0"
			:readonly="elementData.readonly != 0"
			:maxlength="elementData.max_length"
			v-model="elementData.value"
			:type="elementData.type"
			:label="elementData.name"
			:placeholder="elementData.title"
			:rules="[{ required: elementData.required != 0 }]"
		/>
	</van-cell-group>
</template>

<script>
import formItemMixin from '../mixin/index';
export default {
	name: 'input-text',
	mixins: [formItemMixin],
	methods: {
	}
};
</script>

<style lang="less" scoped>
</style>
