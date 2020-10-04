import {request} from './config'
// 根据音乐id获取音乐url
export function getMusicUrl(id){
	return request({
		url:'/song/url',
		method:"GET",
		params:{
			id
		}
	})
}