<template>
  <div>
    <div class="mb-2">
      <div class="classification-item-label" v-for="(item, k) in computedLabels" :key="k">
        <span class="label-bar" :style="`background-color: ${item.color}`"></span>
        {{ item.text }}
      </div>
    </div>
    <div style="font-size: 10px;">
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">PG</strong> Pontos ganhos
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">J</strong> Jogos
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">V</strong> Vitórias
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">E</strong> Empates
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">D</strong> Derrotas
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">GC</strong> Gols contra
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">GP</strong> Gols pró
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">SG</strong> Saldo de gols
      </div>
      <div class="classification-item-label pl-0">
        <strong style="color: #000;">%</strong> Aproveitamento
      </div>
    </div>
  </div>
</template>

<script>
import { Classification } from '../../utils'

export default {
  name: 'ClassificationLabels',
  props: {
    labels: Object
  },
  computed: {
    computedLabels () {
      return Classification(this.labels)
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-item-label {
  position: relative;
  display: inline-block;
  margin-right: 20px;
  color: #999;
  font-size: 12px;
  padding-left: 10px;
  .label-bar {
    position: absolute;
    left: 0;
    top: 2px;
    width: 4px;
    height: 70%;
  }
}
</style>
