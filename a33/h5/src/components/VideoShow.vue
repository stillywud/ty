<template>
	<div class="video_show">
		<div v-if="palyed" class="video_mask" @click.stop="handlePlayControl"></div>
		<div class="video_mask" v-else>
			<van-icon name="play-circle" size="40" color="#FFF" @click.stop="handlePlayControl" />
		</div>
		<video ref="curVideo" :src="url"></video>
	</div>
</template>

<script>
	/**
	 * @description 该组件只是简单的实现了播放暂停功能
	 */
	export default {
		name: 'video-show',
		props: {
			url: {
				type: String,
				required: true,
			},
			videoTime: {
				type: Number,
				required: true,
			},
		},
		data() {
			return {
				palyed: false,
			};
		},
		watch: {
			videoTime() {
				const video = this.$refs.curVideo;
				video.pause();
				this.palyed = false;
			},
		},
		methods: {
			handlePlayControl() {
				const video = this.$refs.curVideo;
				if (video.paused) {
					video.play();
					this.palyed = true;
				} else {
					video.pause();
					this.palyed = false;
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	.video_show {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		> video {
			width: 100%;
			max-height: 100%;
			object-fit: contain;
			cursor: grab;
		}
	}
	.video_mask {
		position: absolute;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
		> .van-icon {
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -20px;
			margin-left: -20px;
			z-index: 1;
		}
	}
</style>
