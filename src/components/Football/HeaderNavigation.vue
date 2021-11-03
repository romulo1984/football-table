<template>
  <div class="media header-navigation" :class="{ 'turn-header py-2': type === 'turn' }">
    <div class="mr-3 py-1 pr-5 pl-1 fase-control fase-control-left" @click="prev" :class="{ 'arrow-disabled': first === changedCurrent }">
      <ArrowLeft color="#999" width="10"/>
    </div>
    <div class="media-body text-center align-self-center">
      <h4 class="text-uppercase font-weight-light" v-if="type === 'phase'">{{ title }}</h4>
      <p class="text-uppercase font-weight-bold m-0" v-else>{{ title }}</p>
    </div>
    <div class="ml-3 py-1 pl-5 pr-1 fase-control fase-control-right" @click="next" :class="{ 'arrow-disabled': last === changedCurrent }">
      <ArrowRight color="#999" width="10"/>
    </div>
  </div>
</template>

<script>
import ArrowRight from '../Icons/ArrowRight'
import ArrowLeft from '../Icons/ArrowLeft'

export default {
  name: 'HeaderNavigation',
  props: {
    list: Array,
    current: String,
    title: String,
    type: {
      type: String,
      default: 'phase'
    }
  },
  components: {
    ArrowRight,
    ArrowLeft
  },
  data () {
    return {
      changedCurrent: this.current,
      first: this.list[0],
      last: this.list[this.list.length - 1]
    }
  },
  methods: {
    prev () {
      if (this.list.indexOf(this.changedCurrent) > 0) {
        this.changedCurrent = this.list[this.list.indexOf(this.changedCurrent) - 1]
      }
    },
    next () {
      if (this.list.indexOf(this.changedCurrent) < this.list.length - 1) {
        this.changedCurrent = this.list[this.list.indexOf(this.changedCurrent) + 1]
      }
    }
  },
  watch: {
    changedCurrent (val) {
      this.$emit('change-current', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-navigation {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.fase-control {
  border-radius: 4px;
  z-index: 999999999;
  cursor: pointer;
  &.arrow-disabled {
    opacity: .2;
    &:hover {
      cursor: default;
    }
  }
}

.turn-header {
  border-top: 1px solid #dee2e6;
  border-bottom: 2px solid #dee2e6;
  font-size: 12px;
  color: #9c9c9c;
}
</style>
