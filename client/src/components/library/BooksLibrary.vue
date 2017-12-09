<template>
  <div>
    <b-jumbotron class="primary-bg mb-0" fluid>
      <h4 class="secondary-color">{{title}}</h4>
    </b-jumbotron>
    <b-container class="bg-light p-5" fluid>
      <b-row v-if="books">
          <b-col cols='md-2' v-for="book in books" :key="book._id">
            <b-card-group deck>
              <router-link :to="/books/ + book._id">
                <b-card class="mb-3 book-detail">
                  <div>
                    <img :src="book.volumeInfo.imageLinks.thumbnail">
                    <p>{{book.title}}</p>
                    <p v-for="author in book.volumeInfo.authors" :key="author" class="small">{{author}}</p>
                  </div>
                </b-card>
              </router-link>
            </b-card-group>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import ApiService from '../../api'
const api = new ApiService()

export default {
  name: 'library',
  data () {
    return {
      title: 'Library',
      books: null
    }
  },
  methods: {
    async fetchBooks () {
      const data = await api.getAllBooks()
      this.books = data.data
    }
  },
  created: function () {
    this.fetchBooks()
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
  color: inherit;
}
</style>
