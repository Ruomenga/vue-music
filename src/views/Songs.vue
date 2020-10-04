<template>
  <div class="songs">
    <div class="back">
      <i class="fa fa-arrow-left icon" @click="$router.back()"></i>
    </div>
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div
          class="scroll-item"
          :class="{ active: index == activeIndex }"
          v-for="(item, index) in songCategory"
          :key="index"
          @click="changeItem(index, item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <scroll class="wrapper" :data="songs" :pulldown="true" @pulldown="loadMore()" >
      <div class="content" ref="content">
        <song-list
          :song="item"
          v-for="(item, index) in songs"
          :key="index"
          @toSongDetail="toSongDetail(item)"
        />
      </div>
    </scroll>
    <router-view />

  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { getSongCategory, getSong } from "@/api/songCategory";
import SongList from "@/components/common/SongList";
import Scroll from "@/components/common/Scroll";
export default {
  components: {
    SongList,
    Scroll,
  },
  data() {
    return {
      songCategory: null,
      activeIndex: 1,
      songs: null,
      currentTag:'流行',
      index:1,
      tag:{
        page:0,
        name:''
      }
    };
  },
  created() {
    this._getSongCategory();
    this._getSong('流行',this.index)
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 1000);
  },
  // 销毁滚动事件
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    // 初始化better-scroll
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true, // 允许横向滚动
        probeType: 3,  
        click: true,
      });
    },
    // 点击获取相应的数据
    changeItem(index, item) {
      this.activeIndex = index;
      this.tag.name = item.name;
      this._getSong(this.tag.name,this.tag.page);
    },
    // 获取歌单分类
    async _getSongCategory() {
      const res = await getSongCategory();
      this.songCategory = res.data.sub;
    },
    // 获取分类中的歌单列表
    async _getSong(tag,index) {
      const res = await getSong(tag, index);
      this.songs = res.data.playlists;
    },
    // 跳转到歌单详情
    toSongDetail(song) {
      this.$router.push({
        path: `/songs/${song.id}`,
      });
    },
    // 下拉加载更多
    loadMore(){
      this._getSong(this.tag.name,this.tag.page++)
    }
  },
};
</script>

<style lang="less" scoped>
.songs {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #fff;
  .back {
    margin: 10px 0 0 5px;
    font-size: 20px;
  }
  .scroll-wrapper {
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    top: 0;
    margin-left: 30px;
    width: 90%;
    .scroll-content {
      display: inline-block;
    }
    .scroll-item {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      padding: 0 10px;
    }
    .scroll-item.active {
      color: #dd6d60;
    }
  }
  .wrapper {
    height: 94vh;
    overflow: hidden;

    .content {
      width: 100%;
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
  }
}
</style>>