import {request} from './config'

// 歌单详情
export function getSongDetail(id){
	return request({
		url:'/playlist/detail',
		method:"GET",
		params:{
			id
		}
	})
}

// 根据音乐id获取音乐详情
export function getSongList(ids){
	return request({
		url: '/song/detail',
		method: 'GET',
		params:{
			ids
		}
	})
}

