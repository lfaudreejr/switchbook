<template>
  <div id="app">
    <navigation :auth='auth' :authenticated="authenticated"></navigation>
    <router-view :auth='auth' :authenticated="authenticated"></router-view>
  </div>
</template>

<script>
import navigation from '@/components/nav/Navigation'
import AuthService from './auth/AuthService'

const auth = new AuthService()
const {login, logout, authenticated, authNotifier} = auth

export default {
  name: 'app',
  components: {navigation},
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      name: 'SwitchBook',
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
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
