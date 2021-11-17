<template>
  <v-container>
    <DashboardCards />
  </v-container>
</template>

<script>
import DashboardCards from '~/components/core/cards/Dashboard-Cards'
export default {
  name: 'DashboardPage',
  components: { DashboardCards },
  layout: 'dashboard',
  head: {
    title: 'Dashboard'
  }
}
</script>

<style scoped>

</style>
