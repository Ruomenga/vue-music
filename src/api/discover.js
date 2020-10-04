
import {request} from './config'

// 轮播图数据
export function getBanners(){
    return request({
        url:"/banner",
        method:"GET",
        params:{
            type:1
        }
    })
}

// 热门推荐歌单
export function getHotRecommend(limit){
    return request({
        url:'/personalized',
        method:"GET",
        params:{
            limit:6
        }
    })
}

// 获取飙升榜歌曲
export function getMusicList(id){
    return request({
        url:'/playlist/detail',
        method:"GET",
        params:{
            id:19723756
        }
    })
}