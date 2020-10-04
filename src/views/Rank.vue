<template>
  <div>
    <scroll :data="rankList" class="rank">
      <div>
        <ul>
          <li
            v-for="item in rankList"
            :key="item.id"
            ref="itemId"
            @click="changeItem(item)"
          >
            <img :src="item.coverImgUrl" alt="" />
          </li>
        </ul>
      </div>
    </scroll>
    <router-view />
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll";
import MusicList from "@/components/common/MusicList";
import { getAllRank, getRankDetail } from "@/api/getRank";
export default {
  name: "Rank",
  components: {
    Scroll,
    MusicList,
  },
  data() {
    return {
      rankList: null, //存储所有的排行榜
      rankPlayList: 0, //存储排行榜里的歌曲
    };
  },

  created() {
    this._getAllRank();
  },
  methods: {
    // 获取所有榜单
    async _getAllRank() {
      const res = await getAllRank();
      // console.log(res.data.list)
      this.rankList = res.data.list;
    },
    // 获取榜单中的歌曲
    async _getRankDetail(id) {
      const res = await getRankDetail(id);
    },
    changeItem(song) {
      this._getRankDetail(song.id);
      this.$router.push({
        path: `/rank/${song.id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rank {
  margin: 0 10px;
  height: 95vh;
  overflow: hidden;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      margin: 5px 9px;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>