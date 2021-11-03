<template>
  <div class="football-table my-3" v-if="all">
    <h2 class="text-center text-uppercase league-title" v-if="all && showTitle">
      {{ all['nome-comum'] }}
    </h2>
    <Loading :active="isLoading"/>

    <HeaderNavigation
      v-if="all"
      :list="all['ordem-fases']"
      :title="all.fases[currentPhase].nome"
      :current="currentPhase"
      @change-current="changeCurrentPhase"
      class="mb-3"
    />

    <div v-for="(phase, phaseIndex) in all.fases" :key="phaseIndex">
      <div v-show="currentPhase === phase.id">
        <div class="row" v-if="phase.grupos">
          <div class="col-md-8">
            <div v-for="(group, groupIndex) in phase.grupos" :key="groupIndex" class="mb-5">
              <h6 class="text-uppercase">
                {{ group }}
              </h6>
              <GroupTable :table="phase" :teams="teams" :group="group"/>
            </div>
            <ClassificationLabels :labels="phase['faixas-classificacao']"/>
          </div>
          <div class="col-md-4">
            <h6 class="text-uppercase">Jogos</h6>

            <HeaderNavigation
              v-if="all"
              :list="turnsToArray(phase.jogos.rodada || [])"
              :title="`${phase.currentTurn}ª Rodada`"
              :current="phase.currentTurn"
              @change-current="current => phase.currentTurn = current"
              type="turn"
            />

            <div v-for="(rodada, rodadaIndex) in phase.jogos.rodada" :key="`${phase.id}-${rodadaIndex}`">
              <div v-show="rodadaIndex === phase.currentTurn">
                <MatchItem v-for="(match, matchIndex) in rodada" :key="`${phase.id}-${matchIndex}`" :match="phase.jogos.id[match]" :teams="teams"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else-if="phase.jogos.data">
          <div class="col-12">
            <div v-for="(matchGroup, matchGroupIndex) in phase.jogos.data" :key="matchGroupIndex">
              <MatchItem
                v-for="(match, matchIndex) in matchGroup"
                :force-full-name="true"
                :key="matchIndex"
                :match="phase.jogos.id[match]"
                :teams="teams"/>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="col-12">
            <div class="card text-center">
              <div class="card-body py-5">
                <p class="text-muted m-0 py-5">Confrontos ainda não definidos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import GroupTable from './GroupTable'
import MatchItem from './MatchItem'
import ClassificationLabels from './ClassificationLabels'
import HeaderNavigation from './HeaderNavigation'
import { CurrentPhase } from '../../utils'

export default {
  name: 'FootballTable',
  props: {
    showTitle: {
      type: Boolean,
      default: false
    },
    year: {
      type: String,
      default: '2019'
    },
    league: {
      type: String,
      default: '30'
    },
    endpoint: String
  },
  components: {
    ClassificationLabels,
    Loading,
    GroupTable,
    MatchItem,
    HeaderNavigation
  },
  data () {
    return {
      baseUrl: this.endpoint, // '//localhost/api/campeonato/'
      all: null,
      isLoading: false,
      currentPhase: null
    }
  },
  async mounted () {
    await this.getAll()
  },
  methods: {
    changeCurrentPhase (val) {
      this.currentPhase = val
    },
    turnsToArray (turns) {
      let newTurns = []

      Object.keys(turns)
        .map(key => parseInt(key))
        .sort((a, b) => a - b)
        .forEach(item => newTurns.push(item.toString()))

      return newTurns
    },
    async getAll () {
      this.isLoading = true
      return axios({
        method: 'GET',
        url: '',
        baseURL: `${this.baseUrl}${this.year}/${this.league}`
      }).then(res => {
        Object.keys(res.data.fases).forEach(fase => {
          res.data.fases[fase].currentTurn = (this.turnPosition(res.data.fases[fase]) + 1).toString()
        })

        this.currentPhase = CurrentPhase(res.data)

        this.all = res.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    disableArrows (total, current) {
      let disable = []
      if (total === current + 1) disable.push('next')
      if (current === 0) disable.push('prev')

      return disable
    },
    turnPosition (phase) {
      if (phase.rodada === undefined) {
        return 0
      } else if (phase.rodada.hasOwnProperty('atual')) {
        return parseInt(phase.rodada.atual) - 1
      } else {
        const rodadas = Object.keys(phase.rodada).map(group => {
          return phase.rodada[group]
        })

        if (rodadas[0].hasOwnProperty('atual')) return rodadas[0].atual ? parseInt(rodadas[0].atual) - 1 : 0
        return 0
      }
    },
    handleInit (position, ref) {
      setTimeout(() => {
        this.$refs[ref][0].goTo(position)
      }, 1000)
    }
  },
  computed: {
    teams () {
      return this.all.equipes
    }
  },
  watch: {
    year () {
      this.getAll()
    },
    league () {
      this.getAll()
    }
  }
}
</script>

<style lang="scss">
@import url("~bootstrap/dist/css/bootstrap.min.css");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap");
@import url("../../../node_modules/vue-loading-overlay/dist/vue-loading.css");

.football-table * {
  font-family: 'Open Sans', sans-serif !important;
}

.league-title {
  position: relative;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ccc;
}
</style>
