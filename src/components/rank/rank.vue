<template>
    <div class="rank" ref="rank">
      <scroll :data="topList" class="toplist" ref="toplist">
        <ul>
          <li class="item" v-for="(item, key) in topList" :key="key" @click="selectItem(item)">
            <div class="icon">
              <img width="100" height="100" v-lazy="item.picUrl">
            </div>
            <ul class="songlist" ref="songList">
              <li class="song" v-for="(item, index, key) in item.songList" :key="key">
                <span>{{index + 1}}</span>
                <span>{{item.songname}}-{{item.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="loading-container" v-if="!topList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>

<script>
import {getRank} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [
    playListMixin
  ],
  data() {
    return {
      topList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getRank()
    })
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    }),
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist._refresh()
    },
    _getRank() {
      getRank().then((res) => {
        if (res.code === ERR_OK) {
          this.topList = res.data.topList
        }
      })
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
