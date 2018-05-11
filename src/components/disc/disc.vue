<template>
  <transition class="slide">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getDiscSongList} from 'api/recommend'
import {CreateSong} from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getDiscSongList()
    })
  },
  methods: {
    _getDiscSongList() {
      console.log('getDiscSongList')
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getDiscSongList(this.disc.dissid).then((res) => {
        console.log('normalize')
        this.songs = this._normalizeSong(res.cdlist[0].songlist)
        console.log('getDiscSongList success')
        // eslint-disable-next-line
        // eval(res)
      })
    },
    _normalizeSong(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(CreateSong(musicData))
        }
      })
      return ret
    }
    // jsonCallback(res) {
    //   this.response = Base64.Base64.decode(res.cdlist)
    //   console.log('jsonpcallback')
    //   console.log(this.response)
    // }
  },
  components: {
    MusicList
  }
}
</script>
<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
