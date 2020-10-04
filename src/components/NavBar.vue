<template>
  <div class="tab">
    <div
      v-for="(item, index) in titles"
      :key="index"
      :class="{ active: index === activeIndex }"
      @click="itemClick(index)"
    >
      <router-link :to="item.path">
        <slot name="img"></slot>
        <span>{{ item.title }}</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tab",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      activeIndex: 1,
    };
  },
  methods: {
    itemClick(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style lang="less" scoped>
.tab {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
  div {
    span {
      color: #ccc;
    }
  }
  div.active {
    span {
      font-size: 18px;
      color: #000;
    }
  }
}
</style>