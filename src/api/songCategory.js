import {request} from './config'

// 歌单分类
export function getSongCategory(){
    return request({
        url:'/playlist/catlist',
        method:"GET"
    })
}

// 根据歌单类别获取歌单数据
export function getSong(cat,offset){
    return request({
        url:'/top/playlist',
        method:"GET",
        params:{
			limit:18,
			offset:(offset-1)*18,
			cat
		}
    })
}