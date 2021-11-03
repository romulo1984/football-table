<template>
  <div class="media">
    <div class="mr-3 py-1 pr-5 pl-3 fase-control fase-control-left" @click="prev" :class="{ 'arrow-disabled': disable.find(e => e === 'prev') }">
      <span class="fas fa-chevron-left"></span>
    </div>
    <div class="media-body text-center">
      <h4 class="text-uppercase font-weight-light">{{ title }}</h4>
    </div>
    <div class="ml-3 py-1 pl-5 pr-3 fase-control fase-control-right" @click="next" :class="{ 'arrow-disabled': disable.find(e => e === 'next') }">
      <span class="fas fa-chevron-right"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhaseHeader',
  props: {
    title: String,
    prev: Function,
    next: Function,
    disable: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.fase-control {
  border-radius: 4px;
  z-index: 999999999;
  &:hover {
    cursor: pointer;
  }
  &-left {
    background-image: linear-gradient(to right, antiquewhite, #fff);
    &:hover {
      background-image: linear-gradient(to right, #f5e4bf, #fff);
    }
  }
  &-right {
    background-image: linear-gradient(to left, antiquewhite, #fff);
    &:hover {
      background-image: linear-gradient(to left, #f5e4bf, #fff);
    }
  }
  &.arrow-disabled {
    opacity: .2;
    &:hover {
      cursor: default;
    }
  }
}
</style>
