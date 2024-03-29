'use strict';
let {
	APP_ID,
	APP_SECRET,
	access_token
} = require('config')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data: {
			grant_type: 'authorization_code',
			appid: APP_ID,
			secret: APP_SECRET,
			js_code: event.code
		},
		contentType: 'json', // 指定以application/json发送data内的数据
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	access_token = res.data.session_key
	//返回数据给客户端
	return res
};
