<template>
    <div class="singer" ref="singer">
      <list-view :data="singerList" @select="selectSinger" ref="list"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
import {GetSinger} from 'api/singer'
import {ERR_OK} from 'api/config'
import ListView from 'base/listview/listview'
import {CreateSinger} from 'common/js/singer'
import {mapMutations} from 'vuex'
import {playListMixin} from 'common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  mixins: [
    playListMixin
  ],
  data() {
    return {
      singerList: []
    }
  },
  mounted() {
    this._createSingerList()
  },
  methods: {
    handlePlayList(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list._refresh()
    },
    selectSinger(item) {
      this.$router.push({
        path: `/singer/${item.mid}`
      })
      this.setSinger(item)
    },
    _createSingerList() {
      GetSinger().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this._normalizeSinger(res.data.list)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(CreateSinger({
            id: item.Fsinger_id,
            mid: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(CreateSinger({
          id: item.Fsinger_id,
          mid: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      let hotList = []
      let retList = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          retList.push(val)
        } else if (val.title === HOT_NAME) {
          hotList.push(val)
        }
      }
      retList.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hotList.concat(retList)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>
<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
