<template>
	<van-cell-group>
		<van-field
			v-model="elementData.value"
			:type="elementData.type"
			:label="elementData.title"
			placeholder="请输入"
		/>
	</van-cell-group>
</template>

<script>
export default {
	name: 'input-main',
	props: {
		elementData: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="less" scoped>
</style>