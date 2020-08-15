<template>
  <div class="search_body">
    <mt-search v-model="value">
      <div class="search_result">
        <h3>电影/电视剧/综艺</h3>
        <ul>
          <li v-for="(item,index) in movielist" :key="index">
            <div class="img"><img :src="item.img | SetWH('260.300')" alt=""></div>
            <div class="info">
              <p>
                <span>{{ item.nm }}</span><span>{{ item.sc }}</span>
              </p>
              <p>{{ item.enm }}</p>
              <p>{{ item.cat }}</p>
              <p>{{ item.rt }}</p>
            </div>
          </li>
        </ul>
      </div>
    </mt-search>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Search
  } from 'mint-ui'
  Vue.component(Search.name, Search)
  export default {
    data() {
      return {
        value: '',
        movielist: []
      }
    },
    name: 'Search',
    watch: {
      value(newVal) {
        this.axios.get(
          '/ajax/search?cityId=10&stype=-1&kw=' + newVal
        ).then(res => {
          var movies = res.data.movies
          if (movies) {
            this.movielist = res.data.movies.list
            console.log(this.movielist)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  #content .search_body {
    flex: 1;
    overflow: auto;
  }

  .search_body .search_result h3 {
    margin-top: 100px;
    font-size: 15px;
    color: #999;
    padding: 9px 15px;
    border-bottom: 1px solid #e6e6e6;
  }

  .search_body .search_result li {
    border-bottom: 1px #c9c9c9 dashed;
    padding: 10px 15px;
    box-sizing: border-box;
    display: flex;
  }

  .search_body .search_result .img {
    width: 80px;
    float: left;
  }

  .search_body .search_result .img img {
    width: 100%;
  }

  .search_body .search_result .info {
    float: left;
    margin-left: 15px;
    flex: 1;
  }

  .search_body .search_result .info p {
    height: 40px;
    display: flex;
    line-height: 22px;
    font-size: 12px;
  }

  .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
    font-size: 18px;
    flex: 1;
  }

  .search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
    font-size: 16px;
    color: #fc7103;
  }
</style>
