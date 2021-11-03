<template>
  <div class="home">
    <FootballTable
    league="52"
    year="2018"
    endpoint="http://localhost:3000/"/>
  </div>
</template>

<script>
import FootballTable from '../components/Football/FootballTable.vue'

export default {
  name: 'home',
  components: {
    FootballTable
  }
}
</script>
