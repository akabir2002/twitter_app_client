<template>
  <v-app dark>
    <!--    Abb bar for logged users-->
    <v-app-bar
      v-if='$auth.loggedIn'
      dark
      fixed
      clipped-left
      elevation='1'
      app
    >
      <v-btn icon class='d-none d-sm-flex' @click='miniVariant = !miniVariant'>
        <v-icon color='darkgrey'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='darkgrey--text mr-3' @click='drawer = !drawer' />
      <v-btn icon to='/'>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-spacer />
    </v-app-bar>

    <!--    App bar for anonymouse users -->
    <v-app-bar v-else app elevation='1' clipped-left dark>
      <v-btn icon class='d-none d-sm-flex' @click='miniVariant = !miniVariant'>
        <v-icon color='darkgrey'>mdi-{{ miniVariant ? 'chevron-right' : 'chevron-left' }}</v-icon>
      </v-btn>
      <v-app-bar-nav-icon class='darkgrey--text mr-3' @click='drawer = !drawer' />
      <v-btn icon to='/'>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn color='grey' text depressed dark link to='/auth/login'>Sign In</v-btn>
      <v-btn color='grey' text depressed dark link to='/auth/signup'>Sign Up</v-btn>
    </v-app-bar>

    <!--    Navigation-->
    <v-navigation-drawer
      v-model='drawer'
      :mini-variant='miniVariant'
      fixed
      clipped
      mobile-breakpoint='500'
      dark
      app
    >

      <simplebar style='height: 100%'>
        <v-list dark nav>
          <v-list-item
            v-for='(item, i) in items'
            :key='i'
            :to='item.to'
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text='item.title' />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </simplebar>

    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import simplebar from 'simplebar-vue'

export default {
  components: { simplebar },
  data() {
    return {
      title: 'Vuetify.js',
      miniVariant: false,
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/dashboard' },
        { title: 'Users', icon: 'mdi-card-account-details', to: '/dashboard/users' },
        { icon: 'mdi-cog', title: 'Settings', to: '/dashboard/settings' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
