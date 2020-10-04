<template>
  <transition name="slider">
    <div class="detail">
      <top style="margin-top: 5px;">
        <div class="right" slot="right">
          <i class="fa fa-search icon"></i>
        </div>
        <div class="center" slot="center">{{ songDetail.name }}</div>
      </top>
      <div class="wrapper">
        <div class="wrapper-content">
          <div class="bg">
            <img v-lazy="songDetail.coverImgUrl" alt class="blur" />
          </div>
          <div class="content">
            <div class="img">
              <img v-lazy="songDetail.coverImgUrl" alt />
              <div class="playCount">
                <i class="fa fa-play-circle-o icon"></i>
                <span>{{ playCount }}</span>
              </div>
            </div>
            <div class="desc">
              <h4>{{ songDetail.name }}</h4>
              <img v-lazy="user[0]" alt class="header" />
              <span>{{ user[1] }}</span>
              <p>{{ songDetail.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="playIcon">
          <i class="fa fa-play-circle-o icon"></i>
          <span>播放全部</span>
          <span class="total">(共{{ length }}首)</span>
        </div>
        <scroll :data="songs" class="songList">
          <ul>
            <li
              v-for="(item, index) in songs"
              :key="index"
              @click="selectItem(item, index)"
            >
              <div class="song">
                <span>{{ index + 1 }}</span>
                <div class="len">
                  <p class="title">{{ item.songs[0].name.trim() }}</p>
                  <span class="album"
                    >{{ item.songs[0].ar[0].name.trim() }}-{{
                      item.songs[0].al.name.trim()
                    }}</span
                  >
                  <i class="fa fa-play-circle-o icon"></i>
                </div>
              </div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </transition>
</template>

<script>
import Top from "@/components/common/Top";
import Scroll from "@/components/common/Scroll";
import { getSongDetail, getSongList } from "@/api/songDetail";
import { getMusicUrl } from "@/api/getMusicUrl";
import { mapActions } from "vuex";

export default {
  components: {
    Top,
    Scroll,
  },
  data() {
    return {
      id: null, //歌单id
      musicUrl: null, //音乐id
      songDetail: [], //存储歌单详情数据
      user: [], //用户信息
      playCount: 0,
      songs: [], //存储歌曲详情
      length: 0, //歌单里共有多少歌曲
    };
  },
  created() {
    this.id = this.$route.params.id;
    this._getSongDetail();
  },

  methods: {
    async _getSongDetail() {
      const res = await getSongDetail(this.id);
      this.songDetail = res.data.playlist;
      this.user.push(
        res.data.playlist.creator.avatarUrl,
        res.data.playlist.creator.nickname
      );
      // 处理播放量
      if (res.data.playlist.playCount > 10000) {
        this.playCount =
          (res.data.playlist.playCount / 10000).toFixed(0) + "万";
      }
      let len = res.data.playlist.trackIds.length;
      let ids = [];
      for (let i = 0; i < len; i++) {
        if (!ids) {
          return;
        } else {
          ids.push(res.data.playlist.trackIds[i].id);
        }
      }
      // 歌曲详情
      ids.forEach((ele, index) => {
        getSongList(ele).then((res) => {
          let song = res.data;
          this.songs.push(song);
        });
      });
      this.length = ids.length;
    },

    ...mapActions(["selectPlay"]),
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  background: #fff;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .wrapper {
    position: relative;
    margin: 5px 0 20px 0;
    height: 41.667vw;
    // border: 0.278vw solid red;
    overflow: hidden;
    .wrapper-content {
      position: relative;
      .bg {
        height: 41.667vw;
        filter: blur(8.333vw);
      }
      // img {
      //   width: 100%;
      // }
    }
    .content {
      position: absolute;
      top: 0;
      height: 100%;
      display: flex;
      border-radius: 1.389vw;
      justify-content: space-around;
      .img {
        width: 30.556vw;
        height: 30.556vw;
        position: relative;
        img {
          width: 30.556vw;
          height: 30.556vw;
          border-radius: 1.389vw;
        }
        .playCount {
          position: absolute;
          top: 0.556vw;
          right: 2.778vw;
          color: #f7f7f7;
          font-size: 3.889vw;
        }
      }
      .desc {
        height: 30.556vw;
        overflow: hidden;
        margin-left: 5.556vw;
        img {
          width: 9.722vw;
          height: 9.722vw;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 1.389vw;
        }
        span {
          font-size: 3.889vw;
        }
        p {
          font-size: 3.333vw;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  .list {
    border-radius: 4.167vw;
    border-top: 0.278vw solid #000;
    .playIcon {
      text-align: center;
      font-size: 4.444vw;
      margin: 2.778vw;
      .icon {
        font-size: 8.333vw;
        vertical-align: middle;
        margin: 0 1.389vw;
      }
      .total {
        margin: 0 1.389vw;
        color: #aaa;
        font-size: 3.333vw;
      }
    }
    .songList {
      height: 54vh;
      ul {
        li {
          height: 13.889vw;
          text-align: center;
          .song {
            display: flex;
            align-items: center;
            span {
              margin-right: 8.333vw;
              margin-left: 1.389vw;
              color: #aaa;
              text-align: center;
              font-size: 4.444vw;
            }
            .len {
              display: flex;
              .title {
                font-size: 3.889vw;
                width: 100px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .album {
                font-size: 3.333vw;
                color: rgba(0, 0, 0, 0.5);
                width: 36.111vw;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .icon {
                font-size: 5.556vw;
                color: rgba(0, 0, 0, 0.5);
                position: absolute;
                right: 4.167vw;
              }
            }
          }
        }
      }
    }
  }
}

.slider-enter-active,
.slider-leave-active {
  transition: all 1s;
}
.slider-enter,
.slider-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>>
