import {request} from './config'

// 获取所有榜单
export function getAllRank(){
    return request({
        url:'/toplist',
        method:"GET",
    })
}

// 获取榜单详情
export function getRankDetail(id){
    return request({
        url:'/playlist/detail',
        method:"GET",
        params:{
            id
        }
    })
}