<template>
  <div>
    <Header title='影院'></Header>
    <CiList></CiList>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Header from '../../components/header'
  import tabbar from '../../components/Tabbar'
  import CiList from '../../components/CiList'
  export default {
    name: 'Cinema',
    components: {
      Header,
      tabbar,
      CiList
    }
  }
</script>

<style>
</style>
