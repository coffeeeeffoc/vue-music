<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
            @touchstart.prevent="ProgressTouchStart"
            @touchmove.prevent="ProgressTouchMove"
            @touchend="ProgressTouchEnd"
            ref="progressBtn"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')
const progressBtnLength = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    ProgressTouchStart(e) {
      // console.log('start')
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    ProgressTouchMove(e) {
      // console.log('move')
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnLength, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    ProgressTouchEnd() {
      // console.log('end')
      this.touch.initiated = false
      this._triggerPercent()
    },
    _triggerPercent() {
      const progressBarLength = this.$refs.progressBar.clientWidth - progressBtnLength
      const percent = this.$refs.progress.clientWidth / progressBarLength
      this.$emit('percentChange', percent)
    },
    _offset(offsetLength) {
      this.$refs.progress.style.width = `${offsetLength}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetLength}px, 0, 0)`
    },
    progressClick(e) {
      // const rect = this.$refs.progressBar.getBoundingClientRect()
      // const offsetWidth = e.pageX - rect.left
      // this._offset(offsetWidth)
      this._offset(e.offsetX)
      this._triggerPercent()
    }
  },
  watch: {
    percent: {
      handler(newPercent) {
        setTimeout(() => {
          console.log(newPercent)
          if (newPercent >= 0 && !this.touch.initiated) {
            const progressBarLength = this.$refs.progressBar.clientWidth - progressBtnLength
            const offsetLength = progressBarLength * newPercent
            this._offset(offsetLength)
          }
        }, 0)
      },
      sync: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
