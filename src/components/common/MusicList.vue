<template>
<transition name="slider">
  <div class="songs">
    <h3>{{ title }}</h3>
    <div
      class="songItem"
      v-for="(item, index) in musicList"
      :key="index"
      @click="select(index, item)"
    >
      <img v-lazy="item.songs[0].al.picUrl" alt="" />
      <span>{{ item.songs[0].name }}</span>
      <span>{{ item.songs[0].al.name }}</span>
      <i class="fa fa-play-circle-o icon"></i>
    </div>
  </div>
</transition>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["musicList", "title"],
  methods: {
    select(index, item) {
      this.selectPlay({
        list: this.musicList,
        index,
      });
    },
    ...mapActions(["selectPlay"]),
  },
};
</script>

<style lang="less" scoped>
.songs {
  .songItem {
    margin: 10px 5px;
    img {
      width: 65px;
      height: 65px;
      vertical-align: middle;
      border-radius: 5px;
    }
    span {
      margin-left: 10px;
      display: inline-block;
      width: 100px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    span:nth-of-type(2) {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
    }
    .icon {
      font-size: 28px;
      color: #f40;
      position: relative;
      right: -20px;
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

