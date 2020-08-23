<template>
  <div class="city_body" ref="city">
    city
    <div class="city_hot">
      <h2>热门城市</h2>
      <ul>
        <li v-for="(data,index) in hotpot " :key="index.cityId" @click="handletocity(data.cityId,data.name)">
          {{data.name}}
        </li>
      </ul>
    </div>
    <div class="citylist">
      <mt-index-list>
        <mt-index-section :index="data.index" v-for="data in datalist" :key="data.index">
          <div v-for="data in data.list" :key="data.cityId">
            <div @click="handletocity(data.cityId,data.name)">
              <mt-cell :title="data.name"></mt-cell>
            </div>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        datalist: [],
        hotpot: []
      }
    },
    name: 'City',
    mounted() {
      var datalist = window.localStorage.getItem('datalist')
      var hotpot = window.localStorage.getItem('hotpot')
      if (datalist && hotpot) {
        this.datalist = JSON.parse(datalist)
        this.hotpot = JSON.parse(hotpot)
      } else {
        this.axios({
          url: 'https://m.maizuo.com/gateway?k=4743030',
          headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052"}',
            'X-Host': 'mall.film-ticket.city.list'
          }
        }).then(res => {
          var msg = res.data.msg
          if (msg === 'ok') {
            var data = res.data.data.cities
            this.datalist = this.handlecitylist(data)
            this.hotpot = this.handlehotpot(data)
            console.log(this.hotpot)
            this.$refs.city.style.height = document.documentElement.clientHeight - 60 + 'px'
            window.localStorage.setItem('datalist', JSON.stringify(this.datalist))
            window.localStorage.setItem('hotpot', JSON.stringify(this.hotpot))
          }
        })
      }
    },
    methods: {
      handlecitylist(cities) {
        // console.log(cities)
        var letters = []
        for (var i = 65; i < 91; i++) {
          letters.push(String.fromCharCode(i))
        }
        var datalist = []
        for (i = 0; i < letters.length; i++) {
          var templist = cities.filter(item => item.pinyin.substring(0, 1) === letters[i].toLowerCase())
          if (templist.length > 0) {
            datalist.push({
              index: letters[i],
              list: templist
            })
          }
        }
        console.log(datalist)
        return datalist
      },
      handlehotpot(cities) {
        var hottemp = []
        for (var i = 0; i < cities.length; i++) {
          if (cities[i].isHot === 1) {
            hottemp.push(cities[i])
          }
        }
        return hottemp
      },
      handletocity(id, name) {
        this.$store.commit('city/CITY_INFO', {
          id,
          name
        })
        window.localStorage.setItem('nowName', name)
        window.localStorage.setItem('nowId', id)
        this.$router.push('/film/nowplaying')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .city_body {
    overflow: hidden;
  }

  .city_body .city_hot {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .city_body .city_hot h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #f0f0f0;
    font-weight: normal;
  }

  .city_body .city_hot ul li {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 3%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
  }
</style>
