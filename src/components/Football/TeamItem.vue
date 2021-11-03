<template>
  <div>
    <div class="media team-item d-flex align-items-center" v-if="type === 'match'">
      <div class="media-left mr-2" v-if="side === 'right'">
        <img :src="team.brasao" :alt="team['nome-comum']" width="30">
      </div>
      <div class="media-body">
        <p class="m-0 font-weight-light d-block d-lg-none">
          {{ team.sigla }}
        </p>
        <p class="m-0 font-weight-light d-none d-lg-block">
          {{ forceFullName ? team['nome-comum'] : team.sigla }}
        </p>
      </div>
      <div class="media-right ml-2" v-if="side === 'left'">
        <img :src="team.brasao" :alt="team['nome-comum']" width="30">
      </div>
    </div>
    <div class="media team-item" v-if="type === 'table'">
      <img :src="team.brasao" :alt="team['nome-comum']" width="22">
      <div class="media-body align-self-center ml-2">
        <p class="m-0 font-weight-light text-left d-block d-lg-none">{{ team.sigla }}</p>
        <p class="m-0 font-weight-light text-left d-none d-lg-block">{{ team['nome-comum'] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamItem',
  props: {
    team: Object,
    type: {
      type: String,
      default: 'table'
    },
    side: {
      type: String,
      default: 'right'
    },
    forceFullName: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.team-item {
  border: 0 !important;
}
</style>
