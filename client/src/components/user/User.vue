<template>
  <div>
    <b-jumbotron class="primary-bg text-white mb-0" fluid>
      <h4 class="secondary-color">{{title}}</h4>
    </b-jumbotron>

    <div>
      <b-alert v-if='!requestedTrades' variant='secondary' class="mb-0" show>
        <p>Requested Trades: 0</p>
      </b-alert>
      <b-alert v-if='requestedTrades' variant='success' class="mb-0" show>
        <div>
          <p>Current Requested trades: {{requestedTrades}}</p>
          <b-btn class="primary-bg" @click="$router.push('/user/requests')">Manage Requested Trades</b-btn>
        </div>
      </b-alert>
    </div>

    <div>
      <b-alert v-if='!pendingTrades' variant='secondary' class="mb-0" show>
        <p>Pending Trades: 0</p>
      </b-alert>
      <b-alert v-if='pendingTrades' variant='success' class="mb-0" show>
        <p>Current Pending trades: {{pendingTrades}}</p>
        <b-btn class="primary-bg" @click="$router.push('/user/requests')">Manage Pending Trades</b-btn>
      </b-alert>
    </div>

    <b-container class="bg-light p-5" fluid>
      <h4 class="mb-5">Currently owned books:</h4>
      <b-row v-if="books">
          <b-col cols='md-2' v-for="book in books" :key="book._id">
            <b-card-group deck>
              <b-card class="mb-3">
                <div>
                  <img :src="book.volumeInfo.imageLinks.thumbnail">
                  <p>{{book.volumeInfo.title}}</p>
                  <p v-for="author in book.volumeInfo.authors" :key="author" class="small">{{author}}</p>
                </div>
              </b-card>
            </b-card-group>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ApiService from '../../api';
const api = new ApiService();

export default {
  name: 'user',
  data () {
    return {
      title: 'Profile',
      books: null,
      requestedTrades: null,
      pendingTrades: null,
      formText: null,
      selectToTrade: null,
      selectToRemoveTrade: null
    };
  },
  methods: {
    async fetchUserBooks () {
      try {
        let data = await api.getBooksByUser();
        this.books = data.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchNumberPendingTrades () {
      try {
        const count = await api.getNumberPendingTrades();
        this.pendingTrades = count.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchNumberRequestedTrades () {
      try {
        const count = await api.getNumberRequestedTrades();
        this.requestedTrades = count.data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  created: async function () {
    await this.fetchUserBooks();
    await this.fetchNumberPendingTrades();
    await this.fetchNumberRequestedTrades();
  },
  watch: {
    '$route': ['fetchUserBooks', 'fetchNumberPendingTrades', 'fetchNumberRequestedTrades']
  }

};
</script>

<style scoped>

</style>
