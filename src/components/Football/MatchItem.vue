<template>
  <div class="match-item">
    <div class="row d-flex">
      <div class="col-12">
        <div class="text-center text-uppercase text-secondary match-arena mb-2" v-if="match">
          {{ match.estadio }}
        </div>
      </div>
      <div class="col-4 text-right">
        <TeamItem type="match" side="left" :team="teams[match.time1]" v-if="teams && match" :forceFullName="forceFullName"/>
      </div>
      <div class="col-4 text-center d-flex align-items-center justify-content-center font-weight-light" v-if="match">
        <span class="pr-3 match-score">
          <strong>{{ match.placar1 || '-' }}</strong>
        </span>
        <IconTimes width="10" color="#ccc"/>
        <span class="pl-3 match-score">
          <strong>{{ match.placar2 || '-' }}</strong>
        </span>
      </div>
      <div class="col-4">
        <TeamItem type="match" :team="teams[match.time2]" v-if="teams && match" :forceFullName="forceFullName"/>
      </div>
      <div class="col-12 text-center" v-if="match && match.penalti1">
        <span class="badge badge-secondary px-3" title="Pênaltis">
          {{ match.penalti1 }} x {{ match.penalti2 }}
        </span>
      </div>
      <div class="col-12">
        <div class="mt-2 text-center text-uppercase text-secondary match-time" v-if="match && match.data">
          {{ moment(match.data).format('dddd') }}, {{ moment(match.data).format('DD/MM') }} às {{ match.horario }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamItem from './TeamItem'
import IconTimes from '../Icons/IconTimes'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale()

export default {
  name: 'MatchItem',
  props: {
    match: Object,
    teams: Object,
    forceFullName: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TeamItem,
    IconTimes
  },
  methods: {
    moment
  }
}
</script>

<style lang="scss" scoped>
.match-item {
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}
.match-arena {
  font-size: 10px !important;
}
.match-time {
  font-size: 11px !important;
}
.match-score {
  font-size: 20px !important;
}
</style>
