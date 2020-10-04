import {request} from './config'

export function getLyric(id){
    return request({
        url:"/lyric",
        method:"GET",
        params:{
            id
        }
    })
}