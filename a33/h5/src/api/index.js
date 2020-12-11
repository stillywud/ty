import {fetchGet, fetchPost} from '../utils/fetch';

const getComponentsTypeApi = (params, config) => fetchGet('/patrolTemplate/getCategoryTemp', params, config); // 获取模板信息
const uploadPatrolImage = (params, config) => fetchPost('/fileUpload/uploadPatrolImage', params, config); // 上传图片
const uploadPatrolVideo = (params, config) => fetchPost('/fileUpload/uploadPatrolVideo', params, config); // 上传视频
const addPatrolRecord = (params, config) => fetchPost('/patrolRecord/addPatrolRecord', params, config); // 上传表单
const getPatrolRecord = (params, config) => fetchPost('/patrolRecord/getPatrolRecord', params, config); // 预览
const updatePatrolRecord = (params, config) => fetchPost('/patrolRecord/updatePatrolRecord', params, config); // 修改

export {
	getComponentsTypeApi,
	uploadPatrolImage,
	uploadPatrolVideo,
	addPatrolRecord,
	getPatrolRecord,
	updatePatrolRecord,
};
