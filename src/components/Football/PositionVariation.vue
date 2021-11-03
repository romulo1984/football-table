<template>
  <span class="position-variation text-right d-flex align-items-center justify-content-center">
    <ArrowAltDown width="7" color="red" v-if="position < 0" />
    <ArrowAltUp width="7" color="green" v-else-if="position > 0" />
    <IconCircle color="#ccc" v-else />
    <span class="pl-1">{{ Math.abs(position) }}</span>
  </span>
</template>

<script>
import ArrowAltDown from '../Icons/ArrowAltDown'
import ArrowAltUp from '../Icons/ArrowAltUp'
import IconCircle from '../Icons/IconCircle'

export default {
  name: 'PositionVariation',
  props: {
    position: Number
  },
  components: {
    ArrowAltDown,
    ArrowAltUp,
    IconCircle
  }
}
</script>

<style scoped>
.position-variation {
  color: #808080;
  font-size: 11px;
}
</style>
