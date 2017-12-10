<template>
  <b-navbar toggleable="md" type='light' class="bg-light p-3">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-navbar-brand class="primary-color" href='/home'>SwitchBook</b-navbar-brand>
      <b-nav-item @click="auth.login()" v-if="!authenticated">Login/Register</b-nav-item>
      <!-- <b-nav-item @click="auth.logout()" v-if="authenticated">Logout</b-nav-item> -->
      <b-nav-item v-if="profile">Hello, {{profile}}</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-form @submit="onSubmit" @reset="onReset">
        <b-form-input v-model="search.title" size="sm" class="mr-sm-2" type="text" placeholder="Find a Book"/>
        <b-button size="sm" class="my-2 my-sm-0" type="submit">Go!</b-button>
      </b-nav-form>

      <b-nav-item href='/library' v-if="authenticated">Library</b-nav-item>

      <b-nav-item-dropdown text='Add Book' v-if="authenticated">
        <b-form class="px-3 py-1" @submit="submitBook">
          <b-form-group label='Book Title'>
            <b-form-input v-model="addBook.title" size='sm' type='text'></b-form-input>
          </b-form-group>
          <b-form-group label='Book Author'>
            <b-form-input v-model="addBook.author" size='sm' type='text'></b-form-input>
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

      <b-nav-item-dropdown right v-if="authenticated">
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
import ApiService from '../../api'
const api = new ApiService()

export default {
  name: 'navigation',
  props: ['auth', 'authenticated', 'profile', 'book'],
  data () {
    return {
      search: {
        title: ''
      },
      addBook: {
        title: '',
        author: ''
      }
    }
  },
  methods: {
    async submitBook (evt) {
      evt.preventDefault()
      const {data} = await api.submitBook(this.addBook)
      const el = document.querySelector('div.dropdown-menu')
      el.classList.toggle('show')
      this.$router.push('/books/' + data._id)
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.search))
      // TODO: add http call to endpoint find by title
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = false
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => { this.show = true })
    }
  }
}
</script>

<style scoped>

</style>
