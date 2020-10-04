<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal">
      <!-- 大播放器 -->
      <div class="normal-player" v-show="fullScreen">
        <!-- 背景图 -->
        <div class="bg">
          <img :src="currentSong.songs[0].al.picUrl" alt />
        </div>
        <!-- 顶部放回 -->
        <div class="top">
          <div class="back" @click="back">
            <i class="fa fa-arrow-left icon-back"></i>
          </div>
          <!-- 歌曲名 -->
          <h1 class="title" v-html="currentSong.songs[0].name"></h1>
          <!-- 歌手名 -->
          <h2 class="subtitle" v-html="currentSong.songs[0].ar[0].name"></h2>
        </div>
        <!-- 中间部分 -->
        <div
          class="middle"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <!-- 专辑界面 -->
          <div class="middle-l" ref="middleL">
            <!-- cd图片 -->
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img :src="currentSong.songs[0].al.picUrl" alt class="image" />
              </div>
            </div>
            <!-- 当前播放歌词 -->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ currentLyric }}</div>
            </div>
          </div>
          <!-- 歌词界面 -->
          <scroll :data="lyricArray" class="middle-r" ref="lyricList">
            <div class="lyric-wrapper">
              <div class="lyric">
                <p
                  class="current-lyric"
                  :class="{ current: currentLyricNum == index }"
                  ref="lyricLine"
                  v-for="(item, index) in lyricArray"
                  :key="index"
                >
                  {{ item[1] }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <!-- 底部 -->
        <div class="bottom">
          <!-- 切换cd和专辑界面 -->
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <!-- 进度条相关 -->
          <div class="progress-wrapper">
            <!-- 当前播放时间 -->
            <span class="current-time time">{{ format(currentTime) }}</span>
            <!-- 进度条 -->
            <div class="progress-bar-wrapper">
              <progress-bar
                :precent="precent"
                @precentChange="precentChange"
              ></progress-bar>
            </div>
            <!-- 总时长 -->
            <span class="all-time time">{{ allTime }}</span>
          </div>
          <!-- 操作相关 -->
          <div class="operator">
            <!-- 上一曲 -->
            <div class="icon-left icon" :class="disableClass">
              <i class="fa fa-backward" @click="prev()"></i>
            </div>
            <!-- 暂停播放 -->
            <div class="icon-center icon" :class="disableClass">
              <i @click="togglePlaying" class="fa" :class="playIcon"></i>
            </div>
            <!-- 下一曲 -->
            <div class="icon-right icon" :class="disableClass">
              <i class="fa fa-forward" @click="next()"></i>
            </div>
            <!-- 是否喜爱 -->
            <div class="icon-right icon" :class="loveClass">
              <i class="fa fa-heart" @click="love(currentSong)"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <!-- 小播放器 -->
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <!-- 专辑图片 -->
        <div class="icon">
          <img
            :class="cdClass"
            v-lazy="currentSong.songs[0].al.picUrl"
            width="40"
            height="40"
            alt
          />
        </div>
        <!-- 歌曲信息 -->
        <div class="music-info">
          <!-- 歌曲名 -->
          <p class="music-name" v-html="currentSong.songs[0].name"></p>
          <!-- 歌手 -->
          <p class="singer" v-html="currentSong.songs[0].ar[0].name"></p>
        </div>
        <!-- 播放 -->
        <div class="control">
          <progress-circle :precent="precent">
            <i
              class="fa icon"
              :class="playIcon"
              @click.stop="togglePlaying"
            ></i>
          </progress-circle>
        </div>
      </div>
    </transition>
    <audio
      :src="musicUrl"
      ref="audio"
      preload="auto"
      @canplay="ready"
      @timeupdate="updateTime"
      @error="error"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import ProgressBar from "./ProgressBar";
import ProgressCircle from "./ProgressCircle";
import Scroll from "@/components/common/Scroll";
import { getMusicUrl } from "@/api/getMusicUrl";
import { getLyric } from "@/api/getLyric";
import { parseLyric } from "@/common/parseLyric";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
  },
  created() {
    this.touch = {};
  },
  data() {
    return {
      musicUrl: null, // 音乐链接
      songReady: false, // 歌曲是否可以播放
      currentTime: 0, // 歌曲当前播放时间
      allTime: 0, // 歌曲总时长
      isLove: false, //是否喜爱
      currentShow: "cd", // 当前显示界面
      lyricArray: null, // 歌词
      currentLyric: null, // 当前播放的歌词
      currentLyricNum: 0, // 当前播放歌词所在行
    };
  },
  computed: {
    ...mapGetters([
      "fullScreen", //全屏
      "playlist", //播放列表
      "currentSong", //当前播放歌曲
      "playing", //是否播放
      "currentIndex", //当前播放歌曲索引
      "sequenceList", //顺序播放列表
      "loveList",
    ]),
    // 播放图标切换
    playIcon() {
      return this.playing ? "fa-pause-circle-o" : "fa-play-circle-o";
    },
    // 专辑是否旋转
    cdClass() {
      return this.playing ? "play" : "play pause";
    },
    // 歌曲没加载出来禁止切换
    disableClass() {
      return this.songReady ? "" : "disable";
    },
    // 进度条
    precent() {
      return this.currentTime / (this.currentSong.songs[0].dt / 1000);
    },
    loveClass() {
      return this.isLove ? "love" : "";
    },
  },
  watch: {
    // 当前播放歌曲是否改变
    currentSong(newSong, oldSong) {
      this.isLove = false;
      this._getMusicUrl();
      this.getSongAllTime();
      this._getLyric();
      setTimeout(() => {
        this.$refs.audio.play();
      }, 1000);
      if (this.$store.state.loveList.indexOf(newSong) != -1) {
        this.isLove = true;
      }
    },
    // 监听播放状态
    playing(newPlaying) {
      const audio = this.$refs.audio;
      if (this.songReady) {
        newPlaying ? audio.play() : audio.pause();
      }
    },
  },
  methods: {
    ...mapMutations({
      // 控制大播放器是否显示 false不显示，true显示
      setFullScreen: "SET_FULL_SCREEN",
      // 控制歌曲是否播放
      setPlayingStart: "SET_PLAYING_START",
      // 当前播放歌曲索引
      setCurrentIndex: "SET_CURRENT_INDEX",
      // 设置播放模式
      setPlayMode: "SET_PLAY_MODE",
      // 设置播放列表
      setPlayList: "SET_PLAYLIST",
      // 添加到喜欢
      setLoveList: "SET_LOVE_LIST",
    }),
    // 返回大播放器
    open() {
      this.setFullScreen(true);
    },
    // 返回小播放器
    back() {
      this.setFullScreen(false);
    },
    // 获取音乐url
    async _getMusicUrl() {
      const res = await getMusicUrl(this.currentSong.songs[0].id);
      this.musicUrl = res.data.data[0].url;
    },
    // 获取歌词
    async _getLyric() {
      const res = await getLyric(this.currentSong.songs[0].id);
      if (res.data.lrc.lyric != "") {
        this.lyric = res.data.lrc.lyric;
        let result = parseLyric(this.lyric);
        this.lyricArray = result;
      }
    },
    // 切换播放状态
    togglePlaying() {
      this.setPlayingStart(!this.playing);
    },
    // 歌曲是否可以播放
    ready() {
      this.songReady = true;
    },
    //  歌曲出现错误时可以切换歌曲
    error() {
      this.songReady = true;
    },
    // 当前歌曲播放时间
    updateTime(e) {
      this.currentTime = e.target.currentTime;
      if (this.lyricArray) {
        for (let i = 0; i < this.lyricArray.length; i++) {
          if (
            this.currentTime >= this.lyricArray[i][0] &&
            this.currentTime < this.lyricArray[i + 1][0]
          ) {
            this.currentLyricNum = i;
            this.currentLyric = this.lyricArray[i][1];
          }
        }
      }
      this.handleLyric();
    },
    // 当歌词发生改变时执行该函数
    handleLyric() {
      if (this.currentLyricNum > 5) {
        let lineEl = this.$refs.lyricLine[this.currentLyricNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    // 处理时间函数
    format(time) {
      time = Math.floor(time);
      let min = Math.floor(time / 60);
      if (min < 10) {
        min = "0" + min;
      }
      let second = time % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return `${min}:${second}`;
    },
    // 获取歌曲总时长
    getSongAllTime() {
      let time = this.currentSong.songs[0].dt;
      this.time = time;
      let min = parseInt(time / 1000 / 60);
      if (min < 10) {
        min = "0" + min;
      }
      let second = parseInt((time / 1000) % 60);
      if (second < 10) {
        second = "0" + second;
      }
      this.allTime = `${min}:${second}`;
    },
    // 进度条改变
    precentChange(precent) {
      this.$nextTick(() => {
        // 设置已播放时间  歌曲总时长 * 播放百分比
        this.currentTime = this.$refs.audio.duration * precent;
        const time = this.currentTime;
        // 将已播放时间赋值给audio
        this.$refs.audio.currentTime = this.currentTime;
      });
      if (!this.playing) {
        this.togglePlaying();
      }
    },
    // 上一曲
    prev() {
      // 如果歌曲没有加载完成，则不能点击
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying();
      }
      this.songReady = false;
    },
    // 下一曲
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length == 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index == this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    // 只有一首歌时循环播放
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
    },
    // 当前歌曲播放完
    end() {
      this.next();
    },
    // 添加到喜欢
    love(song) {
      this.selectLove({
        song,
      });
      this.isLove = true;
    },
    ...mapActions(["selectLove"]),

    middleTouchStart(e) {
      this.touch.initiated = true;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      const left = this.currentShow == "cd" ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.middleL.style.opacity = 1 - this.touch.percent;
      this.$refs.lyricList.$el.style.transitionDuration = 0;
      this.$refs.middleL.style.transitionDuration = 0;
    },
    middleTouchEnd() {
      let offsetWidth;
      let opacity;
      if (this.currentShow == "cd") {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = "lyric";
        } else {
          offsetWidth = 0;
          opacity = 0;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = "cd";
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`;
      const time = 300;
      this.$refs.lyricList.$el.style.transitionDuration = `${time}ms`;
      this.$refs.middleL.style.opacity = opacity;
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: #222;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: 18px;
          color: #fff;
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #fff;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            .image {
              position: relative;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #eabf38;
            font-weight: 700;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .current-lyric {
            line-height: 32px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            &.current {
              color: #eabf38;
              font-weight: 700;
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          &.active {
            width: 20px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.8);
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: #fff;
          font-size: 12px;
          flex: 0 0 33px;
          line-height: 30px;
          width: 30px;
          &.current-time {
            text-align: left;
          }
          &.all-time {
            text-align: right;
            margin-left: 15px;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operator {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: #ffcd32;
          &.disable {
            color: rgba(255, 255, 255, 0.3);
          }
          i {
            font-size: 30px;
          }
        }
        .icon-left {
          text-align: right;
        }
        .icon-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .icon-right {
          text-align: left;
        }
        .love {
          color: #f40;
        }
      }
    }
    .normal-enter-active,
    .normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    .normal-enter,
    .normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 50px;
    background: #777;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .music-info {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .music-name {
        margin-bottom: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #fff;
      }
      .singer {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      margin: 0 5px;
      .icon-play-mini,
      .icon-pause-mini {
        font-size: 30px;
        color: rgba(255, 255, 255, 0.3);
      }
      .icon {
        font-size: 32px;
        position: absolute;
        left: -18px;
        top: 0;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>