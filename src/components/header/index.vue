<template>
  <div>
    <nav>
      {{title}}
    </nav>
    <hr>
  </div>
</template>

<script>
  export default {
    props: ['title']
  }
</script>

<style lang='scss' scoped>
nav{
  background-color: #B3D4FC;
  text-align: center;
  font-size: 30px;
}
</style>
