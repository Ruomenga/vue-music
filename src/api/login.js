import {request} from './config'

// 登录
export function login(phone,password){
    return request({
        url:'/login/cellphone',
        method:"GET",
        params:{
            phone,
            password
        }
    })
}

// 根据用户id获取用户id
export function getUserInfo(uid){
    return request({
        url:'/user/detail',
        method:"GET",
        params:{
            uid
        }
    })
}

// 根据用户id获取用户歌单
export function getUserSongs(uid){
    return request({
        url:'/user/playlist',
        method:'GET',
        params:{
            uid
        }
    })
}

