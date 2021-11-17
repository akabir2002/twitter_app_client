import Vue from 'vue'

export default Vue.filter('date', function (value) {
  if (!value) return ''
  // value = value.toString()
  // return upperFirst(value)
})
