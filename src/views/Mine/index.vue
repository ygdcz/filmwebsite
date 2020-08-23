<template>
  <div>
    <Header title='我的中心'></Header>
    <Login></Login>
    <Map></Map>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import tabbar from '../../components/Tabbar'
  import Login from '../../components/Login'
  import Map from '../../components/map'
  export default {
    name: 'Mine',
    components: {
      Header,
      tabbar,
      Login,
      Map
    }
  }
</script>

<style>
</style>
