<template>
  <transition class="slide">
    <music-list :title="title" :rank="true" :bgImage="bgImage" :songs="topSongs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getTopSongs} from 'api/rank'
import {ERR_OK} from 'api/config'
import {CreateSong} from 'common/js/song'

export default {
  data() {
    return {
      topSongs: [],
      rank: true
    }
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      // return this.topList.picUrl
      if (this.topSongs.length) {
        return this.topSongs[0].image
      }
      return ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getTopSongs()
    })
  },
  methods: {
    _getTopSongs() {
      if (!this.topList.id) {
        this.$router.push({
          path: `/rank`
        })
        return
      }
      getTopSongs(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.songlist)
          this.topSongs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        let musicData = item.data
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
  .slide-enter-active .slide-leave-active
    transition: all 0.3s ease
  .slide-enter .slide-leave-to
    transition: translate3d(100%, 0,0)
</style>
