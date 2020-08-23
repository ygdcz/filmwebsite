<template>
  <div class="wraper" ref="wraper">
    <slot></slot>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  export default {
    name: 'Scroller',
    mounted() {
      this.$nextTick(() => {
        this.scroll = new BetterScroll(this.$refs.wraper, {
          tap: true,
          probeType: 1
        })
        this.scroll.on('scroll', () => {
          console.log('scroll')
        })
      })
    }
  }
</script>

<style lang="scss" scoped>
  .wraper {
    height: 100%;
  }
</style>
