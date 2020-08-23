<template>
  <div class="cinema_body" ref='cinema'>
    <Scroller>
      <ul>
        <li v-for="data in cinemalist" :key="data.cinemaId">
          <div>
            <span>{{data.name}}</span>
            <span class="q">
              <span class="price">{{data.lowPrice/100.0}}</span>元起
            </span>
          </div>
          <div class="address">
            <span>{{data.address}}</span>
          </div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
  import BetterScroll from 'better-scroll'
  /* eslint-disable no-new */
  export default {
    data() {
      return {
        cinemalist: [],
        preCityid: -1,
        cityId: 0
      }
    },
    activated() {
      this.cityId = this.$store.state.city.id
      if (this.preCityid === this.cityId) {
        return
      }
      this.axios.get('/ajax/filterCinemas?ci=310110').then(
        res => {
          console.log(res.data)
        }
      )

      this.axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&ticketFlag=1&k=58469350`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(result => {
        if (result.data.msg === 'ok') {
          console.log(result.data)
          this.cinemalist = result.data.data.cinemas
          this.$refs.cinema.style.height = document.documentElement.clientHeight - 0 + 'px'
          this.$nextTick(() => {
            new BetterScroll(this.$refs.cinema, {
              tap: true,
              probeType: 1
            })
          })
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .cinema_body {
    flex: 1;
    overflow: auto;
  }

  .cinema_body ul {
    padding: 20px;
    overflow-y: hidden;
  }

  .cinema_body li {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .cinema_body div {
    margin-bottom: 10px;
  }

  .cinema_body .q {
    font-size: 11px;
    color: #f03d37;
    float: right;
  }

  .cinema_body .price {
    font-size: 18px;
  }

  .cinema_body .address {
    font-size: 13px;
    color: #666;
  }

  .cinema_body .address span:nth-of-type(2) {
    float: right;
  }
</style>
