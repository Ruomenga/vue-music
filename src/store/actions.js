
import * as types from './mutation-types'

// 默认播放配置
export const selectPlay = function({commit, state}, {list, index}) {
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_START, true)
  }

// 设置喜爱的音乐列表
export const selectLove = function({commit,state},{song}){
  commit(types.SET_LOVE_SONG,song)
}

// 存放用户登录token
export const setUserInfo = function({commit,state},{userInfo}){
  commit(types.SET_USER_INFO,userInfo)
}

export const setUserInfoDetail = function({commit,state},{userInfoDetail}){
  commit(types.SET_USER_INFO_DETAIL,userInfoDetail)
}


