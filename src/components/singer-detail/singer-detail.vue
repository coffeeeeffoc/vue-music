<template>
<transition name="slide">
  <!-- <div class="singer-detail"></div> -->
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {GetSingerData} from 'api/singer'
import {ERR_OK} from 'api/config'
import {CreateSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  // props: {

  // },
  created() {
    // console.log(this.singer)
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  mounted() {
    // this.$nextTick(() => {
    this._getSingerDetail()
    // })
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      // console.log(this.singer.id)
      GetSingerData(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.songs = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albumid) {
          ret.push(CreateSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>
<style lang="stylus" scoped>
  // @import "~common/stylus/variable"
  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background
    .slide-enter-active,.slide-leave-active
      transition: all 0.5s
    .slide-enter,.slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
