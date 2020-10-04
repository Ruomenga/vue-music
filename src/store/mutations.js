import * as types from './mutation-types'

const mutations = {
    [types.SET_PLAYING_START](state,flag){
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag){
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state,list){
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state,list){
        state.sequenceList = list
    },
    [types.SET_CURRENT_INDEX](state,index){
        state.currentIndex = index
    },
    [types.SET_LOVE_SONG](state,song){
        state.loveSong = song
    },
    [types.SET_USER_INFO](state,userInfo){
        state.userInfo = userInfo
    },
    [types.SET_USER_INFO_DETAIL](state,userInfoDetail){
        state.userInfoDetail = userInfoDetail
    }
}

export default mutations