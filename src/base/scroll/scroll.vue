<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll()
      // this._setScrollHeight()
    })
  },
  methods: {
    // _setScrollHeight() {
    //   this.$refs.wrapper.style.height = this.$refs.wrapper.clientHeight * 30 + 'px'
    //   console.log(this.$refs.wrapper.style.height)
    // },
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
    },
    _enable() {
      this.scroll && this.scroll.enable()
    },
    _disable() {
      this.scroll && this.scroll.disable()
    },
    _refresh() {
      this.scroll && this.scroll.refresh()
      // console.log('refresh')
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this._refresh()
      })
      // setTimeout(() => {
      //   this._refresh()
      // }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
