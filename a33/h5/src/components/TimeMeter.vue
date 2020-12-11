<template>
	<van-field
		:required="elementData.required != 0"
		:value="showTimeData" center readonly label="提升时间(s)">
		<template #button>
			<van-button size="small" type="primary" @click="handleTimeRun">
				{{ timing ? '停止计时' : timeData ? '重置计时' : '开始计时' }}
			</van-button>
		</template>
	</van-field>
</template>

<script>
	import formItemMixin from '../mixin/index';
	export default {
		name: 'time-meter',
		mixins: [formItemMixin],
		data() {
			return {
				timing: false,
				timeData: 0,
				animationFrame: null,
			};
		},
		computed: {
			showTimeData() {
				return this.timeData / 1000;
			},
		},
		created() {
			this.timeData = this.elementData.value * 1000;
		},
		beforeDestroy() {
			cancelAnimationFrame(this.animationFrame);
		},
		watch: {
			'$root.curTime'() {
				this.suspend();
			},
		},
		methods: {
			/**
			 * @description 定时器的开始（重置） 与 暂停
			 */
			handleTimeRun() {
				if (this.timeData === 0) {
					this.timing = true;
					this.interRun();
				} else {
					//不等于0 点击需要判断是 重置 还是 停止
					if (this.timing === false) {
						this.timeData = 0; // 重置
						this.elementData.value = 0;
					} else {
						this.suspend(); // 暂停
					}
				}
			},
			interRun() {
				const curTime = Date.now();
				const timeAdd = () => {
					this.timeData = Date.now() - curTime;
					if (this.timing === true) {
						window.requestAnimationFrame(timeAdd);
					} else {
						this.$nextTick(() => {
							this.elementData.value = this.showTimeData;
						});
					}
				};
				this.animationFrame = window.requestAnimationFrame(timeAdd);
			},
			suspend() {
				this.timing = false;
			},
		},
	};
</script>

<style lang="less" scoped></style>
