<template>
  <div class="loading">
    <img src="./loading.png">
    <p class="desc">{{tittle}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tittle: '正在载入。。。'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  .loading
    width 100%
    text-align center
    img
      width 24
      height 24
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
