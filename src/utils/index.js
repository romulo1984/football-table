import moment from 'moment'
import Leagues from './Leagues'

const Classification = labels => {
  const colors = {
    1: '#20c634',
    2: '#FFE113',
    3: '#d5150b'
  }
  let newComputedLabels = []

  if (typeof labels === 'object') {
    Object.keys(labels).filter((label, i) => {
      if (labels[label] && labels[label]['faixa']) {
        const faixa = labels[label]['faixa'].split('-')
        newComputedLabels.push({
          color: colors[i + 1],
          text: labels[label]['texto'],
          begin: parseInt(faixa[0]),
          end: parseInt(faixa[1] || faixa[0])
        })
      }
    })
  }

  return newComputedLabels
}

const CurrentPhase = data => {
  const phaseDates = Object.values(data.fases)
    .filter(fase => fase.jogos.data)
    .map(fase => ({
      fase,
      lowestDiff: Object.keys(fase.jogos.data)
        .map(date => moment(date).isValid() ? moment(date).diff(moment()) : -1)
        .filter(diff => diff >= 0)
        .sort()
        .shift()
    }))
    .filter(({ lowestDiff }) => lowestDiff)
    .sort((a, b) => a.lowestDiff - b.lowestDiff)
    .shift()

  return (phaseDates && phaseDates.fase) ? phaseDates.fase.id : data['ordem-fases'][data['ordem-fases'].length - 1]
}

export {
  Classification,
  CurrentPhase,
  Leagues
}
