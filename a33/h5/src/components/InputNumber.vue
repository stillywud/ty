<template>
	<van-cell-group>
		<van-field
			v-model="elementData.value"
			:required="elementData.required != 0"
			:type="elementData.type"
			:label="elementData.name"
			:placeholder="elementData.title"
			:rules="[{ required: elementData.required != 0 }]"
			@blur="vanBlur"
		/>
	</van-cell-group>
</template>

<script>
import formItemMixin from '../mixin/index';
export default {
	name: 'input-number',
	mixins: [formItemMixin],
	methods: {
		vanBlur() {
			// 判断最大值和最小值
			// console.log("是否为空字符,"+ (this.elementData.value === ""))
			if(this.elementData.value != "") {
				console.log("数字"+this.elementData.value)
				if(this.elementData.min != null && this.elementData.value < this.elementData.min){
					this.elementData.value = this.elementData.min
				}
				if(this.elementData.max != null && this.elementData.value > this.elementData.max){
					this.elementData.value = this.elementData.max
				}
			}
		}
	}
};
</script>

<style lang="less" scoped>
</style>
