<template>
  <div>
    <Header title='电影'></Header>
    <ul>
      <router-link to="/film/city" tag="li">城市</router-link>
      <router-link to="/film/nowplaying" tag="li">正在热映</router-link>
      <router-link to="/film/comingsoon" tag="li">即将上映</router-link>
      <router-link to="/film/search2" tag="li">查找</router-link>
    </ul>
    <tabbar></tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import tabbar from '../../components/Tabbar'
  export default {
    name: 'Film',
    components: {
      Header,
      tabbar
    }
  }
</script>

<style lang='scss' scoped>
  ul {
    display: flex;

    li {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: white;
    }
  }

  .router-link-active {
    color: red;
    border-bottom: 2px solid red;
  }
</style>
