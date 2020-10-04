
import state from "./state"

export const playing = state =>state.playing

export const fullScreen = state =>state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state =>state.sequenceList

export const currentIndex = state =>state.currentIndex

export const loveSong = state => state.loveSong

export const userInfo = state => state.userInfo

export const userInfoDetail = state =>state.userInfoDetail

export const currentSong = (state) =>{
    return state.playlist[state.currentIndex] || {}
}

export const loveList = (state) =>{
    return state.loveList.push(state.loveSong)
}

