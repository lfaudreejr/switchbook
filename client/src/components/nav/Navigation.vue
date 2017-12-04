<template>
  <b-navbar toggleable="md" type='light' class="bg-light p-3">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-navbar-brand class="primary-color" href='/home'>SwitchBook</b-navbar-brand>
      <b-nav-item @click="auth.login()" v-if="!authenticated">Login/Register</b-nav-item>
      <b-nav-item @click="auth.logout()" v-if="authenticated">Logout</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item href='/library'>Library</b-nav-item>

      <b-nav-item-dropdown text='Add Book'>
        <b-form class="px-3 py-1" @submit="submitBook">
          <b-form-group label='Book Title'>
            <b-form-input size='sm' type='text'></b-form-input>
          </b-form-group>
          <b-form-group label='Book Author'>
            <b-form-input size='sm' type='text'></b-form-input>
          </b-form-group>
          <b-button type="submit" class="primary-bg">Submit</b-button>
        </b-form>
      </b-nav-item-dropdown>
      <!-- TODO: make authenticated route-->

      <b-nav-item-dropdown text="Lang" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item-dropdown right >
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item href="/user">Profile</b-dropdown-item>
        <b-dropdown-item @click="auth.logout()">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
  </b-navbar>
</template>

<script>

export default {
  name: 'navigation',
  props: ['auth', 'authenticated'],
  methods: {
    submitBook () {}
  }
}
</script>

<style scoped>

</style>
