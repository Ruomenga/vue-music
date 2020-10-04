const state = {
    playing:false,  //播放状态
    fullScreen:false,   //播放器是否全屏
    playlist:[],    //播放列表
    sequenceList:[], //顺序列表
    currentIndex: -1 ,  //当前播放歌曲  
    loveSong: [],    //喜爱的歌曲
    loveList:[],    //喜爱歌曲列表
    userInfo:null,     //用户登录信息
    userInfoDetail:null //用户详细信息
}
export default state