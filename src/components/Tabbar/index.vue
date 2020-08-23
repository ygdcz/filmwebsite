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

  nav {
    width: 100%;
    height: 50px;
    background: white;
    border-top: 2px #ebe8e3 solid;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  ul {
    display: flex;
    text-align: center;
    height: 50px;
    align-items: center;

    li {
      flex: 1;
      height: 40px;
    }
  }

  .router-link-active {
    color: red;
  }
</style>
