<template>
  <div>
    <div class="film_body">
      <ul>
        <li v-for="data in filmlist" :key="data.filmId">
          <div class="pic_show">
            <img :src="data.poster" alt="">
          </div>
          <div class="info_list">
            <h2>{{data.name}}</h2>
            <p>观众评<span class="grade" v-if="data.grade">{{data.grade}}
              </span>
              <span class="grade" v-else>暂无评分</span>
            </p>
            <div class="actorlist">
        <li v-for="(data,index) in data.actors" :key="index">
          <p>{{data.name}}</p>
        </li>
    </div>
  </div>
  <div class="btn_mall">
    <p v-if="data.isPresale">预购</p>
    <p v-else>暂无预售</p>
  </div>
  </li>
  </ul>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        filmlist: []
      }
    },
    name: 'Comingsoon',
    mounted() {
      this.axios({
        url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=2&k=9616359',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        var msg = res.data.msg
        if (msg === 'ok') {
          this.filmlist = res.data.data.films
          console.log(this.filmlist)
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  #content .film_body {
    flex: 1;
    overflow: auto;
  }

  .film_body .pulldown {
    margin: 0;
    padding: 0;
    border: none;
    justify-content: center;
  }

  .film_body ul {
    margin: 0 12px;
    overflow: hidden;
  }

  .film_body ul li {
    margin-top: 12px;
    display: flex;
    align-items: center;
    border-bottom: 1px #e6e6e6 solid;
    padding-bottom: 10px;
  }

  .film_body .pic_show {
    width: 64px;
    height: 90px;
  }

  .film_body .pic_show img {
    width: 100%;
  }

  .film_body .info_list {
    margin-left: 10px;
    flex: 1;
    position: relative;
  }

  .film_body .info_list .actorlist li {
    float: left;
    font-size: 13px;
  }

  .film_body .info_list h2 {
    font-size: 17px;
    line-height: 24px;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .film_body .info_list p {
    font-size: 13px;
    color: #666;
    line-height: 22px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .film_body .info_list .grade {
    font-weight: 700;
    color: #faaf00;
    font-size: 15px;
  }

  .film_body .info_list img {
    width: 50px;
    position: absolute;
    right: 10px;
    top: 5px;
  }

  .film_body .btn_mall,
  .film_body .btn_pre {
    width: 57px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .film_body .btn_pre {
    background-color: #3c9fe6;
  }
</style>
