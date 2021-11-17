<template>
  <div v-if='$fetchState.pending'>
    <v-skeleton-loader type='card' />
  </div>
  <v-row v-else class='mt-2'>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard
        color='secondary'
        class='my-6'
        icon='mdi-account-multiple'
        title='Users'
        :value='videoLength'
        sub-icon='mdi-clock'
        sub-text='Just Updated'
      />
    </v-col>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard
        color='secondary'
        class='my-6'
        icon='mdi-badge-account'
        title='Subscribers'
        value='0'
        sub-icon='mdi-clock'
        sub-text='Just Updated'
      />
    </v-col>
    <v-col cols='12' sm='12' md='4'>
      <MaterialStatsCard
        color='secondary'
        class='my-6'
        icon='mdi-account-edit'
        title='Edited Tweets'
        :value='viewsLength'
        sub-icon='mdi-clock'
        sub-text='Just Updated'
      />
    </v-col>
  </v-row>
</template>

<script>
import { Report } from 'notiflix'
import MaterialStatsCard from '~/components/core/cards/MaterialStatsCard'

export default {
  name: 'DashboardCards',
  components: { MaterialStatsCard },
  data() {
    return {
      videoLength: '0',
      viewsLength: '0',
      loading: false,
    }
  },
  fetch() {
    try {
      this.loading = true

      this.loading = false
    } catch ({ response }) {
      this.loading = false
      Report.failure('Error', response.data.message, 'Ok')
    }
  }
}
</script>

<style scoped></style>
