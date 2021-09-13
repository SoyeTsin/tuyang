'use strict';
import apiService from 'apiService.js'
import config from 'config.js'
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const res = await uniCloud.httpclient.request(apiService.getAccessToken, {
		method: 'POST',
		data: {
			grant_type: 'client_credential',
			appid: config.APP_ID,
			secret: config.APP_SECRET
		},
		contentType: 'json', // 指定以application/json发送data内的数据
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	console.log(res)
	access_token = res.data.access_token;
	config.access_token = access_token
	//返回数据给客户端
	return config
};
