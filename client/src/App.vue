<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from '@/components/nav/Navigation'

export default {
  name: 'app',
  components: {navigation},
  data () {
    return {
      name: 'SwitchBook'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Inconsolata', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
