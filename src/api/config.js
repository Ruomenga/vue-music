import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL:'http://47.106.165.163:3000/',
        withCredentials: true
    })
    return instance(config)
}