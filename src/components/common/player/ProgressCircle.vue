<template>
  <div class="progress-circle">
    <svg
      :width="radius"
      :height="radius"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script >
export default {
  props: {
    radius: {
      // 小进度条的大小
      type: Number,
      default: 32,
    },
    precent: {
      // 进度百分比
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dashArray: Math.PI * 100, // 圆周长
    };
  },
  computed: {
    // 计算要高亮的周周 0-1 对应 全亮到没有
    dashOffset() {
      return (1 - this.precent) * this.dashArray;
    },
  },
};
</script>

<style lang="less" scoped>
.progress-circle {
  position: relative;
  circle {
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: rgba(255, 205, 49, 0.5);
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: #ffcd32;
      stroke-width: 10px;
    }
  }
}
</style>