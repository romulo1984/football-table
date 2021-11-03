<template>
  <div class="table-responsive">
    <table class="table group-table">
      <thead>
      <tr>
        <th class="text-left pl-0" colspan="2">
          <span>CLASSIFICAÇÃO</span>
        </th>
        <th></th>
        <th>PG</th>
        <th>J</th>
        <th>V</th>
        <th>E</th>
        <th>D</th>
        <th>GC</th>
        <th>GP</th>
        <th>SG</th>
        <th>%</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(row, index) in table.classificacao.grupo[group]" :key="index">
        <td>{{ index + 1 }}º</td>
        <td class="classification-indicator" :style="`border-left-color: ${checkClassification(index + 1)}`">
          <TeamItem :team="teams[row]"/>
        </td>
        <td>
          <PositionVariation :position="parseInt(tableRow(row)['ganho-pos']) || 0"/>
        </td>
        <td>{{ tableRow(row).pg.total }}</td>
        <td>{{ tableRow(row).j.total }}</td>
        <td>{{ tableRow(row).v.total }}</td>
        <td>{{ tableRow(row).e.total }}</td>
        <td>{{ tableRow(row).d.total }}</td>
        <td>{{ tableRow(row).gc.total }}</td>
        <td>{{ tableRow(row).gp.total }}</td>
        <td>{{ tableRow(row).sg.total }}</td>
        <td>{{ tableRow(row).ap }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TeamItem from './TeamItem'
import PositionVariation from './PositionVariation'
import { Classification } from '../../utils'

export default {
  name: 'GroupTable',
  props: {
    table: Object,
    teams: Object,
    group: String
  },
  components: {
    TeamItem,
    PositionVariation
  },
  methods: {
    tableRow (row) {
      return this.table.classificacao.equipe[row]
    },
    checkClassification (position) {
      const result = this.labels.filter(label => {
        return position >= label.begin && position <= label.end
      })

      if (result.length) {
        return result[0].color || '#f5f5f5'
      }
      return '#f5f5f5'
    }
  },
  computed: {
    labels () {
      return Classification(this.table['faixas-classificacao'])
    }
  }
}
</script>

<style lang="scss" scoped>
.group-table {
  & * {
    font-weight: 400;
  }
  thead tr th {
    color: #9c9c9c;
    font-size: 12px;
  }
  th, td {
    text-align: center;
    vertical-align: middle !important;
  }
  td {
    &:nth-of-type(4),
    &:nth-of-type(6),
    &:nth-of-type(8),
    &:nth-of-type(10),
    &:nth-of-type(12) {
      background: #f5f5f5;
    }

    &:nth-child(n+4) {
      font-family: monospace !important;
      font-size: 14px;
    }

    &:nth-of-type(3) {
      border-right: 1px solid #ccc;
    }
  }

  .classification-indicator {
    border-left: 3px solid #f5f5f5;
  }
}
</style>
