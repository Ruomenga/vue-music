<template>
<transition name="slider">
  <div class="list">
    <div class="itemBox" @click="toSongDetail(song.id)">
      <img v-lazy="song.picUrl ? song.picUrl : song.coverImgUrl" alt="" />
      <p>{{ song.name }}</p>
      <div class="playCount">
        <i class="fa fa-play icon" aria-hidden="true"></i>
        <span>{{ parsePlay(song.playCount) }}</span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: ["song"],

  methods: {
    toSongDetail(id) {
      this.$emit("toSongDetail", id);
    },
    parsePlay(count) {
      if (count > 10000) {
        return Math.floor(count / 10000) + "万";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.list {
  z-index: 10;
  position: relative;

  .itemBox {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 1.389vw;
    margin: 4.167vw 0.833vw;
    img {
      width: 100%;
      height: 100%;
      border-radius: 1.389vw;
    }
    p {
      font-size: 3.333vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .playCount {
      position: absolute;
      top: 0.556vw;
      right: 1.389vw;
      color: #f7f7f7;
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
