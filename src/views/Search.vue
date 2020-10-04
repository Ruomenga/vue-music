<template>
  <div class="search-wrapper">
    <div class="search">
      <input type="text" placeholder="请输入内容" ref="inp" />
      <i class="fa fa-close icon close" @click="deleteAll"></i>
      <i class="fa fa-search icon" @click="search"></i>
    </div>
    <h4>热搜榜</h4>
    <div class="search-rank">
      <div
        class="rank"
        v-for="(item, index) in hotRank"
        :key="index"
        @click="addQuery(item.searchWord)"
      >
        <span class="title">{{ item.searchWord }}</span>
      </div>
    </div>
    <div class="serch-list">
      <search-list :query="query" v-show="isShow" />
    </div>
  </div>
</template>

<script>
import SearchList from "@/components/SearchList";
import { getHotSearchRank } from "@/api/search";
export default {
  components: {
    SearchList,
  },
  data() {
    return {
      hotRank: null,
      searchResult: [],
      query: null,
      isShow: false,
    };
  },
  
  created() {
    this._getHotRank();
  },
  methods: {
    async _getHotRank() {
      const res = await getHotSearchRank();
      this.hotRank = res.data.data;
    },
    addQuery(keyword) {
      this.$refs.inp.value = keyword;
      this.search(keyword);
    },
    deleteAll() {
      this.$refs.inp.value = "";
      this.isShow = false;
    },
    search(keyword) {
      if (this.$refs.inp.value =='') {
        return
      }
      keyword = this.$refs.inp.value;
        this.query = keyword;
        this.isShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  margin-top: 20px;
  .search {
    display: flex;
    input {
      outline: none;
      border-width: 0;
      border-bottom: 2px solid #ccc;
      padding: 0 20px;
      width: 70%;
      margin: 0 10px 0 20px;
    }
    .icon {
      font-size: 20px;
    }
    .close {
      position: absolute;
      right: 60px;
    }
  }
  h4 {
    margin: 15px;
  }

  .search-rank {
    display: flex;
    flex-wrap: wrap;
    .rank {
      .title {
        padding: 0 5px;
        display: inline-block;
        margin: 5px;
        font-size: 14px;
        border: 1px solid #ccc;
        background: #ccc;
        border-radius: 15px;
      }
    }
  }
}
</style>