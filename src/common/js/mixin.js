import {mapGetters} from 'vuex'

export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted() {
    if (this.playList.length > 0) {
      this.handlePlayList(this.playList)
    }
  },
  activated() {
    if (this.playList.length > 0) {
      this.handlePlayList(this.playList)
    }
  },
  methods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList method')
    }
  },
  watch: {
    playList(newVal) {
      if (newVal.length > 0) {
        this.handlePlayList(newVal)
      }
    }
  }
}
