import axios from 'axios';
import qs from 'qs';
import {Toast} from 'vant';
import {baseURL} from '../config';

// 开发过程中token可以在此页面写死。

// 生成axios 实例 保证axios
const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 30 * 1000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		config.headers['X-Access-Token'] = sessionStorage.getItem('token');
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
	function(response) {
		// 对响应数据做点什么
		if (response.data.code !== 200) {
			Toast(response.data.message);
			return Promise.reject(response.data.message);
		} else {
			return response.data;
		}
	},
	function(error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

const createAxios = (type) => (url, data = {}, config = {}) => {
	const baseConfig = {
		url,
		method: type,
		...config,
	};
	let params;

	// if (config.headers && config.headers['Content-Type'] && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
	// 使用 ?. （可选链）语法可以简化上面的写法。

	if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
		params = qs.stringify(data);
	} else {
		params = data;
	}
	switch (type) {
		case 'get':
			baseConfig.params = params;
			break;
		default:
			baseConfig.data = params;
	}
	return axiosInstance(baseConfig);
};

// 暂时生成 post/get 两种请求方法。
const fetchPost = createAxios('post');
const fetchGet = createAxios('get');

export {fetchGet, fetchPost};
