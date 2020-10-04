import {request} from './config'

// 热搜榜单
export function getHotSearchRank(){
    return request({
        url:"/search/hot/detail",
        method:"GEt"
    })
}

// 根据关键字获取搜索榜单
export function getSearchList(keywords){
    return request({
        url:"/search",
        method:"GET",
        params:{
            keywords
        }
    })
}