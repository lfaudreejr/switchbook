<template>
  <div>
    <b-jumbotron class="primary-bg text-white mb-0" fluid>
      <h4 class="secondary-color">{{title}}</h4>
    </b-jumbotron>

    <div>
      <b-alert v-if='trades[0] === 0' variant='secondary' class="mb-0" show>
        <div v-for="trade in trades" :key="trade">
          <p>Current Requested trades: {{trade}}</p>
        </div>
      </b-alert>
      <b-alert v-if='trades[0] !== 0' variant='success' class="mb-0" show>
        <div v-for="trade in trades" :key="trade">
          <p>Current Requested trades: {{trade}}</p>
        </div>
      </b-alert>
    </div>

    <b-container class="bg-light p-5" fluid>
      <h4 class="mb-5">Currently owned books:</h4>
      <b-row>
          <b-col cols='md-2' v-for="book in books" :key="book._id">
            <b-card-group deck>
              <b-card class="mb-3">
                <div>
                  <img :src="book.volumeInfo.imageLinks.thumbnail">
                  <p>{{book.volumeInfo.title}}</p>
                  <p v-for="author in book.volumeInfo.authors" :key="author"  class="small">{{author}}</p>
                </div>
              </b-card>
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
  name: 'user',
  data () {
    return {
      title: 'Profile',
      books: null,
      trades: [0],
      formText: null
    }
  },
  methods: {
    async fetchUserBooks () {
      const data = await api.getBooksByUser()
      this.books = data.data
    }
  },
  created: function () {
    this.fetchUserBooks()
  }

}
</script>

<style scoped>

</style>
