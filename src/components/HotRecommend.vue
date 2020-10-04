<template>
  <div class="recommend">
    <div class="hot">
      <h3>热门歌单推荐</h3>
      <span class="more">查看更多</span>
      <div class="songsList">
        <song-list
          :song="item"
          v-for="item in hotRecommend"
          :key="item.id"
          @toSongDetail="toSongDetail(item)"
        />
      </div>
    </div>
    <scroll :data="musicList" class="song">
      <music-list title="飙升榜Top 10" :musicList="musicList" />
    </scroll>

    <router-view />
  </div>
</template>

<script>
import SongList from "./common/SongList";
import MusicList from "./common/MusicList";
import Scroll from "@/components/common/Scroll";
import { getHotRecommend, getMusicList } from "@/api/discover";
import { getSongList } from "@/api/songDetail";
export default {
  components: {
    SongList,
    MusicList,
    Scroll,
  },
  data() {
    return {
      hotRecommend: null, //热门推荐歌单
      musicList: [], //新歌速递
    };
  },
  created() {
    this._getHotRecommend();
    this._getMusicList();
  },
  methods: {
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

