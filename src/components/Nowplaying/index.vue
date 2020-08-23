<template>
  <div>
    <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-spinner v-show="list.length<1 && InitialLoading" color="#26a2ff" vertical-align: middle></mt-spinner>
      <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom"
        @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
        <div class="hot-list">
          <div class="hot-one hot-item" v-for="data in list" :key="data.id">
            <a href="javascript:;">
              <div class="img-box">
                <img :src="data.poster" class="fl">
              </div>
              <h5>{{data.name}}</h5>
              <p v-if="data.actors">主演:{{data.actors | actorfilter}}<span class="color_e85647">...详情</span></p>
              <p v-else>暂无主演</p>
              <p>runtime:{{data.runtime}}分钟</p>
            </a>
          </div>
        </div>
        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
        </div>
        <div v-if="allLoaded" style="text-align:center;" class="data-none">没有更多数据了</div>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">加载中
            <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Toast
  } from 'mint-ui'
  Vue.filter('actorfilter', function(data) {
    var newlist = data && data.map(item => item.name)
    return newlist.join(' ')
  })
  export default {
    name: 'Nowplaying',
    data() {
      return {
        pageNum: 1, // 页码
        InitialLoading: true, // 初始加载
        list: [], // 数据
        allLoaded: false, // 数据是否加载完毕
        bottomStatus: '', // 底部上拉加载状态
        wrapperHeight: 0, // 容器高度
        topStatus: '', // 顶部下拉加载状态
        total: 0,
        toastInstanse: null,
        preCityid: -1,
        cityId: 0
      }
    },
    activated() {
      this.cityId = this.$store.state.city.id
      if (this.preCityid === this.cityId) {
        return
      }
      var windowWidth = document.documentElement.clientWidth // 获取屏幕宽度
      if (windowWidth >= 768) { // 这里根据自己的实际情况设置容器的高度
        this.wrapperHeight = document.documentElement.clientHeight - 105
      } else {
        this.wrapperHeight = document.documentElement.clientHeight - 100 - 40
      }
      setTimeout(() => { // 页面挂载完毕 模拟数据请求 这里为了方便使用一次性定时器
        this.axios({
          url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=9248236`,
          headers: {
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
            'X-Host': 'mall.film-ticket.film.list'
          }
        }).then(res => {
          this.preCityid = this.cityId
          this.list = res.data.data.films
          this.total = res.data.data.total
          // console.log(res.data.data.total)
        })
      }, 1500)
    },
    methods: {
      handleBottomChange(status) {
        this.bottomStatus = status
      },
      show() {
        this.toastInstanse = Toast({
          message: '更新中,急个jb', // 弹窗内容
          position: 'middle', // 弹窗位置
          duration: -1 // 弹窗时间毫秒,如果值为-1，则不会消失
        })
      },
      loadBottom() {
        this.handleBottomChange('loading') // 上拉时 改变状态码
        this.pageNum += 1
        console.log(this.pageNum)
        this.show()
        setTimeout(() => { // 上拉加载更多 模拟数据请求这里为了方便使用一次性定时器
          this.axios({
            url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=6627143`,
            headers: {
              'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
              'X-Host': 'mall.film-ticket.film.list'
            }
          }).then(res => {
            if (this.list.length < this.total) {
              this.list = [...this.list, ...res.data.data.films] // 上拉加载 每次数值加12
              console.log(this.list.length, this.total)
            } else {
              this.allLoaded = true // 模拟数据加载完毕 禁用上拉加载
            }
          })
          this.toastInstanse.close()
          this.handleBottomChange('loadingEnd') // 数据加载完毕 修改状态码
          this.$refs.loadmore.onBottomLoaded()
        }, 1000)
      },
      handleTopChange(status) {
        this.topStatus = status
      },
      loadTop() { // 下拉刷新 模拟数据请求这里为了方便使用一次性定时器
        this.handleTopChange('loading') // 下拉时 改变状态码
        this.pageNum = 1
        this.allLoaded = false // 下拉刷新时解除上拉加载的禁用
        setTimeout(() => {
          this.axios({
            url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=1&k=6627143`,
            headers: {
              'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15954063428431020802052","bc":"310100"}',
              'X-Host': 'mall.film-ticket.film.list'
            }
          }).then(res => {
            this.list = res.data.data.films // 下拉刷新 数据初始化
            this.total = res.data.data.total
            this.handleTopChange('loadingEnd') // 数据加载完毕 修改状态码
            this.$refs.loadmore.onTopLoaded()
          })
        }, 1500)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-loadmore-wrapper {
    overflow: scroll;
    z-index: 100;
  }

  .hot-list {
    padding: 0 8px;
  }

  .hot-item {
    padding: 10px 0;
  }

  .hot-one {
    overflow: hidden;
    border-bottom: 1px dashed #ccc;
  }

  .hot-one a img {
    padding-right: 10px;
  }

  .hot-item a img {
    width: 95px;
    height: 90px;
  }

  .fl {
    float: left;
  }

  .hot-one a h5 {
    margin-top: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 6px;
    font-size: 16px;
    color: #000;
  }

  .hot-one a p {
    font-size: 12px;
    color: #828282;
    margin: 0 0 3px;
  }

  .color_e85647 {
    color: #e85647;
  }

  div.hot-list>div:first-child .img-box {
    overflow: hidden;
  }

  div.hot-list>div:first-child img {
    width: 100%;
    height: auto;
    padding-right: 0;
  }
</style>
