<template>
  <div id="app">
    <navigation :auth='auth' :authenticated="authenticated"></navigation>
    <router-view :auth='auth' :authenticated="authenticated"></router-view>
    <hr class="primary-bg m-0">
    <footer class="p-5 bg-dark text-white">
      <p>&copy Larry Faudree 2017</p>
    </footer>
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
.book-detail:hover {
  cursor: pointer;
  background-color:#e5e5e5;
  border: 1px solid;
  border-color: #00D2FF;
}
.color-bg {
background: rgb(238,238,238); /* Old browsers */
background: -moz-linear-gradient(top, rgba(238,238,238,1) 0%, rgba(204,204,204,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top, rgba(238,238,238,1) 0%,rgba(204,204,204,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom, rgba(238,238,238,1) 0%,rgba(204,204,204,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#cccccc',GradientType=0 ); /* IE6-9 */
}
.primary-bg {
  background-color: #00D2FF;
}
.secondary-bg {
  background-color: #cccccc;
}
.primary-color {
  color: #00D2FF !important;
}
</style>
