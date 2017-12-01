<template>
  <b-navbar toggleable="md" type="light" variant="white">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-navbar-brand>SwitchBook</b-navbar-brand>
      <b-nav-item @click="auth.login()" v-if="!authenticated">Login/Register</b-nav-item>
      <b-nav-item @click="auth.logout()" v-if="authenticated">Logout</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'navigation',
  props: ['auth', 'authenticated']

}
</script>

<style scoped>

</style>
