<template>
  <div class="cinema_body">
    <ul>
      <li v-for="data in cinemalist" :key="data.cinemaId">
        <div>
          <span>{{data.name}}</span>
          <span class="q">
            <span class="price">{{data.lowPrice/100}}</span>元起
          </span>
        </div>
        <div class="address">
          <span>{{data.address}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cinemalist: []
      }
    },
    mounted() {
      this.axios.get('/ajax/filterCinemas?ci=310110').then(
        res => {
          console.log(res.data)
        }
      )

      this.axios({
        url: 'https://m.maizuo.com/gateway?cityId=310100&ticketFlag=1&k=58469350',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(result => {
        if (result.data.msg === 'ok') {
          console.log(result.data)
          this.cinemalist = result.data.data.cinemas
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  #content .cinema_body {
    flex: 1;
    overflow: auto;
  }

  .cinema_body ul {
    padding: 20px;
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
