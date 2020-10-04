<template>
  <scroll class="suggest" ref="suggest" :data="searchList">
    <ul class="suggest-list">
      <li
        class="suggest-item"
        v-for="(item, index) in searchList"
        :key="index"
        @click.once="selectItem(item, index)"
      >
        <div class="name">
          <p class="text">{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import { getSongList } from "@/api/songDetail";
import { getSearchList } from "@/api/search";
import { mapActions } from "vuex";
import Scroll from "@/components/common/Scroll";
export default {
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  components: {
    Scroll,
  },
  data() {
    return {
      searchList: null,
      songs: [],
    };
  },
  watch: {
    query() {
      this.searchList = [];
      this._search();
    },
  },
  methods: {
    _search() {
      getSearchList(this.query).then((res) => {
        this.searchList = res.data.result.songs;
        let ids = [];
        for (let i = 0; i < res.data.result.songs.length; i++) {
          if (!ids) {
            return;
          } else {
            ids.push(res.data.result.songs[i].id);
          }
        }
        // 歌曲详情
        ids.forEach((ele, index) => {
          getSongList(ele).then((res) => {
            let song = res.data;
            this.songs.push(song)
          });
        });
      });
    },
    selectItem(item, index) {
      console.log(item);
      this.selectPlay({
        list: this.songs,
        index,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="less" scoped>
.suggest {
  position: absolute;
  width: 100%;
  height: 80vh;
  overflow: hidden;
  top: 70px;
  background: #666;
  border-radius: 15px;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .name {
        font-size: 14px;
        overflow: hidden;
        color: #fff;
      }
    }
  }
}
</style>>