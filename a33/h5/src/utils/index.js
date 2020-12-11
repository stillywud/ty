function formatTime(time, cFormat = '{y}-{m}-{d}') {
	if (!time) return null;
	if (arguments.length === 0) return null;
	if (`${time}`.length === 10) {
		time = +time * 1000;
	}

	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
	let date;
	if (typeof time === 'object') {
		date = time;
	} else {
		date = new Date(time);
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	};
	return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key];
		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
		if (result.length > 0 && value < 10) {
			value = `0${value}`;
		}
		return value || 0;
	});
}
/**
 *
 * @description 将图片等比缩放到某一特定的尺寸 默认为 1080
 * @param {Blob} file
 * @param {Number} maxSize
 */
function changeImgSize(file, maxSize = 1080) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		blobToUrl(file).then((url) => {
			const image = new Image();
			image.src = url;
			image.onload = () => {
				const imageWidth = image.width;
				const imageHeight = image.height;
				const WH_Ratio = imageWidth / imageHeight; // 图片的宽高比例
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				let zoomRatio;
				// 定义 canvas 大小，也就是压缩后下载的图片大小

				if (WH_Ratio > 1) {
					zoomRatio = imageWidth / maxSize;
					canvas.width = maxSize;
					canvas.height = imageHeight / zoomRatio;
				} else {
					zoomRatio = imageHeight / maxSize;
					canvas.height = maxSize;
					canvas.width = imageWidth / zoomRatio;
				}
				ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
				return resolve(convertBase64UrlToBlob(canvas.toDataURL('image/jpeg', 1)));
			};
		});
	});
}
/**
 *
 * @description Base64ToBlob
 * @param {Base64} urlData
 */
function convertBase64UrlToBlob(urlData) {
	var arr = urlData.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type: mime});
}
/**
 * @param {Blob} blob
 */
function blobToUrl(blob) {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = (event) => {
			resolve(event.target.result);
		};
	});
}
export {formatTime, changeImgSize};
