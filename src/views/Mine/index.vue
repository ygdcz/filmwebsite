<template>
  <div>
    <Header title='我的中心'></Header>
    <Login></Login>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import tabbar from '../../components/Tabbar'
  import Login from '../../components/Login'
  export default {
    name: 'Mine',
    components: {
      Header,
      tabbar,
      Login
    }
  }
</script>

<style>
</style>
