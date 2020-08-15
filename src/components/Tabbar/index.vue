<template>
  <div>
    <nav>
      <ul>
        <router-link to="/film" tag="li"> <i class="iconfont icon-dianying">电影</i></router-link>
        <router-link to="/cinema" tag="li"> <i class="iconfont icon--dianyingyuan-">影院</i></router-link>
        <router-link to="/mine" tag="li"> <i class="iconfont icon-gerenzhongxin">我的中心</i></router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
</script>

<style lang='scss' scoped>

  ul {
    display: flex;

    li {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
  }

  nav {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50px;
    background: white;
  }

  .router-link-active {
    color: red;
  }
</style>
