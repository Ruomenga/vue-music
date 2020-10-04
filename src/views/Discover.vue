<template>
  <div class="discover">
    <scroll :data="musicList" class="recommend">
      <div>
        <banner :banner="banner" />
        <tab-list />
        <div class="hot">
          <h3>热门歌单推荐</h3>
          <span class="more" @click="$router.push('/songs')">查看更多</span>
          <div class="songsList">
            <song-list
              :song="item"
              v-for="item in hotRecommend"
              :key="item.id"
              @toSongDetail="toSongDetail(item)"
            />
          </div>
        </div>
        <div class="song">
          <music-list title="飙升榜Top 10" :musicList="musicList" />
        </div>
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import SongList from "@/components/common/SongList";
import MusicList from "@/components/common/MusicList";
import Scroll from "@/components/common/Scroll";
import { getHotRecommend, getMusicList } from "@/api/discover";
import { getSongList } from "@/api/songDetail";
import { getBanners } from "@/api/discover";
import Banner from "@/components/Banner";
import TabList from "@/components/TabList";

export default {
  components: {
    Banner,
    TabList,
    Scroll,
    SongList,
    MusicList,
  },
  data() {
    return {
      banner: [], //轮播图数据
      hotRecommend: null, //热门推荐歌单
      musicList: [], //新歌速递
    };
  },
  created() {
    this._getBanners();
    this._getHotRecommend();
    this._getMusicList();
  },
  methods: {
    // 获取轮播图
    async _getBanners() {
      const res = await getBanners();
      this.banner = res.data.banners;
    },
    async _getHotRecommend() {
      const res = await getHotRecommend();
      this.hotRecommend = res.data.result;
      for (let i = 0; i < this.hotRecommend.length; i++) {
        if (this.hotRecommend[i].playCount > 100000) {
          res.data.result[i].playCount =
            Math.floor(res.data.result[i].playCount / 10000) + "万";
        }
      }
    },
    async _getMusicList() {
      const res = await getMusicList();
      let musicId = res.data.playlist.trackIds.splice(0, 10);
      let len = musicId.length;

      let ids = [];
      for (let i = 0; i < len; i++) {
        if (!ids) {
          return;
        } else {
          ids.push(musicId[i].id);
        }
      }
      // 歌曲详情
      ids.forEach((ele, index) => {
        getSongList(ele).then((res) => {
          let song = res.data;
          this.musicList.push(song);
        });
      });
    },
    toSongDetail(song) {
      this.$router.push({
        path: `/discover/${song.id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  height: 95vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .hot {
    margin: 10px;
    position: relative;
    .more {
      position: absolute;
      right: 0;
      top: 0;
      display: inline-block;
      height: 20px;
      border: 1px solid #aaa;
      padding: 5px;
      border-radius: 10px;
      font-size: 14px;
      box-shadow: 0 0 5px #ccc;
    }
    .songsList {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
  .song {
    margin: 10px 10px 50px 10px;
  }
}
</style>>
