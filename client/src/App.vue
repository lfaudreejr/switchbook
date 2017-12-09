<template>
  <div id="app">
    <navigation :auth='auth' :authenticated="authenticated" ></navigation>
    <router-view :auth='auth' :authenticated="authenticated" ></router-view>
    <footer class="p-5 primary-bg-dark">
      <p class="secondary-color">&copy Larry Faudree 2017</p>
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
  background-color:#f8f9fa;
  border: 1px solid;
  border-color: #320b86;
  /* color: #fff; */
}
.primary-bg {
  background-color: #673ab7;
}
.primary-bg-dark {
  background-color: #320b86;
}
.primary-bg-light {
  background-color: #9a67ea;
}
.secondary-bg {
  background-color: #69f0ae;
}
.secondary-bg-light {
  background-color: #9fffe0;
}
.secondary-bg-dark {
  background-color: #2bbd7e;
}
.primary-color {
  color: #673ab7 !important;
}
.secondary-color {
  color: #69f0ae !important;
}
button.primary-bg:hover {
  background-color: #9a67ea;
}
a.dropdown-item:active {
  background-color: #2bbd7e;
  color: #2c3e50;
}
a.dropdown-item:hover {
  background-color: #f8f9fa;
  /* color: #fff; */
}
a.nav-link:hover {
  color: #673ab7 !important;
}
.primary-border {
  border: 1px solid#320b86;
}
.form-control:focus {
  border-color: #673ab7 !important;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.075) inset, 0px 0px 8px rgba(255, 100, 255, 0.5);
}
.dropdown-menu {
  border-color: #673ab7 !important;
}
.dropdown-menu a.dropdown-item {
  border-color: #673ab7 !important;
}
</style>
