import Vue from 'vue';
import {
	Button,
	Field,
	Cell,
	CellGroup,
	Popup,
	Checkbox,
	CheckboxGroup,
	Radio,
	RadioGroup,
	DatetimePicker,
	Uploader,
	NavBar,
	Tab,
	Tabs,
	Overlay,
	Swipe,
	SwipeItem,
	Toast,
	Icon,
	Empty,
	Form,
} from 'vant';

import App from './App.vue';
import router from './router';
/**
if (process.env.NODE_ENV === 'development') {
	// 不要使用 import() 要不然是按需引入，会先请求之后引入mock😂
	require('./mock');
}
 */

Vue.config.productionTip = false;

Vue.use(Button)
	.use(Field)
	.use(Cell)
	.use(CellGroup)
	.use(Popup)
	.use(Checkbox)
	.use(CheckboxGroup)
	.use(Radio)
	.use(RadioGroup)
	.use(DatetimePicker)
	.use(Uploader)
	.use(NavBar)
	.use(Tab)
	.use(Tabs)
	.use(Overlay)
	.use(Swipe)
	.use(SwipeItem)
	.use(Toast)
	.use(Icon)
	.use(Empty)
	.use(Form);
/**
 *
 * @description 为图片或视频路径添加统一的前缀。
 * @param {*} src
 * @param {*} prefix
 */
Vue.prototype.$addSrcPrefix = (src, prefix = '/jeecg-boot') => {
	if (src) {
		return prefix + src;
	}
	return '';
};

new Vue({
	data: {
		curTime: Date.now(),
	},
	router,
	render: (h) => h(App),
}).$mount('#app');
