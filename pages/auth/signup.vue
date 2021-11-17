<template>
  <v-container class='d-flex justify-center pa-0 ma-0' style='height: 100vh'>
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class='pa-5 text-center fade' shaped>
          <div class='pa-5 d-flex flex-column align-center'>
            <v-btn icon to='/'>
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-card-title >Sign Up</v-card-title>
          </div>

          <v-alert v-show='error' dense type='error' dismissible>
            {{ error_message }}
          </v-alert>

          <v-form
            ref='form'
            v-model='valid'
            lazy-validation
            @submit.prevent='signUpHandler'
          >
            <v-text-field
              v-model='formData.email'
              name='email'
              type='email'
              aria-label='email'
              label='Email'
              :rules='[emailRule]'
              outlined
              dense
              rounded
              placeholder='Email'
              append-icon='mdi-email'
              clearable
            />


            <v-text-field
              v-model='formData.password'
              outlined
              dense
              rounded
              aria-label='password'
              :rules='[min]'
              placeholder='Password'
              :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password ? 'text' : 'password'"
              name='password'
              label='Password'
              clearable
              @click:append='show_password = !show_password'
            />

            <v-text-field
              v-model='passwordConfirm'
              outlined
              dense
              rounded
              aria-label='confirm password'
              :rules='[min, passwordMatch(passwordConfirm, formData.password)]'
              placeholder='Confirm Password'
              :append-icon="passwordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_password1 ? 'text' : 'password'"
              name='confirm password'
              label='Confirm Password'
              clearable
              @click:append='show_password1 = !show_password1'
            />

            <v-switch
              v-model='tos'
              dense
              :rules='[tosValidator]'
              label='Accept terms and condition'
            ></v-switch>

            <v-btn
              rounded
              color='secondary'
              block
              :loading='loading'
              :disabled='!valid'
              type='submit'
            >Sign Up
            </v-btn>

            <v-card-actions>
              <v-row class='subtitle-1 mt-5' justify='space-between'>
                <v-col align='left'>
                </v-col>
                <v-col align='right'>
                  <!--                <nuxt-link to="signup" class="white&#45;&#45;text text-decoration-none body-2">-->
                  <nuxt-link
                    to='login'
                    class='text-decoration-none body-2'
                  >
                    <p>Login</p>
                  </nuxt-link>
                </v-col>
              </v-row>
            </v-card-actions>
            <!--          <v-container class="ma-5">-->
            <!--            <p class="float-right">Dont have account?-->
            <!--              <nuxt-link class="blue&#45;&#45;text" to="signup">Sign Up</nuxt-link>-->
            <!--            </p>-->
            <!--          </v-container>-->
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Report } from 'notiflix'
import rules from '~/mixins/rules'

export default {
  name: 'RegisterPage',
  auth: 'guest',
  mixins: [rules],
  layout: 'auth',
  data: () => ({
    valid: false,
    loading: false,
    error: false,
    error_message: '',
    show_password: false,
    show_password1: false,
    passwordConfirm: '',
    formData: {
      email: '',
      username: '',
      country: '',
      password: ''
    },
    tos: false
  }),
  head: {
    title: 'Sign Up'
  },
  computed: {},
  methods: {
    async signUpHandler() {
      if (!this.$refs.form.validate()) return

      this.loading = true
      this.error = false
      this.error_message = ''

      try {
        const response = await this.$axios.$post('/auth/signup', this.formData)
        await this.$auth.setUserToken(response.token)
        await this.$auth.fetchUser()
        this.loading = false
        await this.$router.push('/')
        Report.success(
          'Success',
          '"Your account was successfully created', 'Ok')
      } catch ({ response }) {
        this.error = true
        this.error_message = response.data.message
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
