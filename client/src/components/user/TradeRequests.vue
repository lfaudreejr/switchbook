<template>
  <div>
    <b-jumbotron class="primary-bg mb-0" fluid>
      <h4 class="secondary-color">{{title}}</h4>
    </b-jumbotron>

    <div v-if="offers">
      <h3>Offers</h3>

      <b-row>
        <b-col v-for="offer in offers" :key="offer._id">

          <b-card-group>
            <b-card title="Requested Book">
              <b-img thumbnail fluid  :src='offer.requestedBook.volumeInfo.imageLinks. thumbnail'></b-img>
              <p class="card-text">Requested by {{offer.requestor}}</p>
            </b-card>

            <b-button class="m-2" variant='success'>Accept</b-button>
            <b-button class="m-2" variant='danger'>Decline</b-button>

            <b-card title="Offered Book">
              <b-img thumbnail fluid :src='offer.bookOffered[0] .volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Offered by {{offer.currentOwner}}</p>
            </b-card>
          </b-card-group>

        </b-col>
      </b-row>
    </div>

    <hr>

    <div v-if="requests">
      <h3>Requests</h3>

      <b-row>
        <b-col v-for="request in requests" :key="request._id">

          <b-card-group>
            <b-card title="Requested Book">
              <b-img thumbnail fluid :src='request.requestedBook.volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Requested by {{request.requestor}}</p>
            </b-card>

            <b-button class="m-2" variant='success' @click="acceptTrade(request)">Accept</b-button>
            <b-button class="m-2" variant='danger' @click="declineTrade(request)">Decline</b-button>

            <b-card title="Offered Book">
              <b-img thumbnail fluid :src='request.bookOffered[0] .volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Offered by {{request.currentOwner}}</p>
            </b-card>
          </b-card-group>

        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import ApiService from '../../api'
const api = new ApiService()

export default {
  data () {
    return {
      title: 'Trades',
      offers: null,
      requests: null
    }
  },
  methods: {
    async fetchRequests () {
      try {
        const data = await api.getRequestedTrades()
        console.log('requested', data)
        this.requests = data.data
      } catch (err) {
        console.error(err)
      }
    },
    async fetchOffers () {
      try {
        const data = await api.getPendingTrades()
        console.log('pending', data)
        this.offers = data.data
      } catch (err) {
        console.error(err)
      }
    },
    async declineTrade (req) {
      console.log(req)
    },
    async acceptTrade (req) {
      console.log(req)
    }
  },
  created: function () {
    this.fetchRequests()
    this.fetchOffers()
  }
}
</script>
