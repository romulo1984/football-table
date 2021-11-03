<template>
  <div class="home">
    <FootballTable
    league="30"
    year="2019"
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
