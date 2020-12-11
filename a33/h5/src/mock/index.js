import Mock from 'mockjs';
import componentsData from './data/componentsData.json';
import filesData from './data/filesData.json';
import preview from './data/previewData.json';
// 设置请求的延时
Mock.setup({
	timeout: 100,
});
Mock.mock(/\/mock\/getCategoryTemp/, 'get', function(option) {
	console.log(option);
	return componentsData;
});
Mock.mock(/\/mock\/uploadPatrolImage/, 'post', function(option) {
	console.log(option);
	return filesData;
});
Mock.mock(/\/mock\/uploadPatrolVideo/, 'post', function(option) {
	console.log(option);
	return filesData;
});
Mock.mock(/\/mock\/addPatrolRecord/, 'post', function(option) {
	console.log(option);
	return {
		code: 200,
		message: '保存成功',
		success: true,
		result: {},
	};
});
Mock.mock(/\/mock\/getPatrolRecord/, 'post', function(option) {
	console.log(option);
	return preview;
});
export default Mock;
