module.exports = {
	devServer: {
		port: '8000',
		disableHostCheck: true,
		proxy: {
			'/jeecg-boot': {
				target: 'http://192.168.30.146:8098',
				changeOrigin: true,
			},
		},
	},
};
