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
          <!-- <b-row>
            <b-col v-for="trade in requestedTrades" :key="trade._id">
              <b-form-checkbox-group v-model="selectToTrade">
                <b-img :src="trade.requestedBook.volumeInfo.imageLinks.thumbnail"></b-img>
                <b-form-checkbox id="acceptTrade" :value='trade'>Select</b-form-checkbox>
              </b-form-checkbox-group>
            </b-col>
          <b-btn @click="submitTrades" class="primary-bg">Accept</b-btn>
          <b-btn @click="deleteTrades" class="bg-danger">Delete</b-btn>
        </b-row> -->
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
        <!-- <b-row>
          <b-col v-for="trade in pendingTrades" :key="trade._id">
            <b-form-checkbox-group v-model="selectToRemoveTrade">
              <b-img :src="trade.bookOffered[0].volumeInfo.imageLinks.thumbnail"></b-img>
              <b-form-checkbox id="selectTrade" :value='trade'>Select</b-form-checkbox>
            </b-form-checkbox-group>
          </b-col>
          <b-btn @click="submitTrades" class="primary-bg">Accept</b-btn>
          <b-btn @click="deleteTrades" class="bg-danger">Delete</b-btn>
        </b-row> -->
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
import ApiService from '../../api'
const api = new ApiService()

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
    }
  },
  methods: {
    async submitTrades () {
      if (this.selectedToTrade) {
        this.selectToTrade.forEach((item) => {

        })
      }
    },
    async deleteTrades () {},
    async fetchUserBooks () {
      try {
        let userBooks = this.getSession('user_books')
        if (userBooks) {
          this.books = userBooks
        } else {
          let data = await api.getBooksByUser()
          this.setSession('user_books', data.data)
          this.books = data.data
        }
      } catch (err) {
        console.error(err)
      }
    },
    async fetchNumberPendingTrades () {
      try {
        const count = await api.getNumberPendingTrades()
        console.log(count)
        this.pendingTrades = count.data
      } catch (err) {
        console.error(err)
      }
    },
    async fetchNumberRequestedTrades () {
      try {
        const count = await api.getNumberRequestedTrades()
        console.log(count)
        this.requestedTrades = count.data
      } catch (err) {
        console.error(err)
      }
    },
    setSession (name, param) {
      sessionStorage.setItem(name, JSON.stringify(param))
    },
    getSession (name, param) {
      let session = JSON.parse(sessionStorage.getItem(name, param))
      if (session) {
        return session
      }
      return null
    }
  },
  created: function () {
    this.fetchUserBooks()
    this.fetchNumberPendingTrades()
    this.fetchNumberRequestedTrades()
  }

}
</script>

<style scoped>

</style>
