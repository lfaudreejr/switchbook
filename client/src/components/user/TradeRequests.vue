<template>
  <div>
    <b-jumbotron class="primary-bg mb-0" fluid>
      <h4 class="secondary-color">{{title}}</h4>
    </b-jumbotron>

    <div v-if="offers && offers.length > 0">
      <b-jumbotron fluid class="secondary-bg-light">Offers</b-jumbotron>

      <b-row>
        <b-col v-for="offer in offers" :key="offer._id">

          <b-card-group>
            <b-card title="Requested Book">
              <b-img thumbnail fluid  :src='offer.requestedBook.volumeInfo.imageLinks. thumbnail'></b-img>
              <p class="card-text">Owned by {{offer.currentOwner}}</p>
            </b-card>

            <b-button class="m-2" variant='success' @click="acceptTrade(offer)">Accept</b-button>
            <b-button class="m-2" variant='danger' @click="declineTrade(offer)">Decline</b-button>

            <b-card title="Offered Book">
              <b-img thumbnail fluid :src='offer.bookOffered.volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Offered by {{offer.requestor}}</p>
            </b-card>
          </b-card-group>

        </b-col>
      </b-row>
    </div>

    <hr>

    <div v-if="requests && requests.length > 0">
      <b-jumbotron fluid class="secondary-bg-light">Requests</b-jumbotron>

      <b-row>
        <b-col v-for="request in requests" :key="request._id">

          <b-card-group>
            <b-card title="Requested Book">
              <b-img thumbnail fluid :src='request.requestedBook.volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Owned by {{request.currentOwner}}</p>
            </b-card>

            <b-button class="m-2" variant='danger' @click="declineTrade(request)">Delete</b-button>

            <b-card title="Offered Book">
              <b-img thumbnail fluid :src='request.bookOffered .volumeInfo.imageLinks.thumbnail'></b-img>
              <p class="card-text">Owned by {{request.requestor}}</p>
            </b-card>
          </b-card-group>

        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
import ApiService from '../../api';
const api = new ApiService();

export default {
  data () {
    return {
      title: 'Trades',
      offers: null,
      requests: null
    };
  },
  methods: {
    async fetchRequests () {
      try {
        const data = await api.getRequestedTrades();
        this.requests = data.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchOffers () {
      try {
        const data = await api.getPendingTrades();
        this.offers = data.data;
      } catch (err) {
        console.error(err);
      }
    },
    async declineTrade (req) {
      await api.declineATrade(req._id);
      this.$router.push('/user');
    },
    async acceptTrade (req) {
      await api.acceptATrade(req);
      this.$router.push('/user');
    }
  },
  created: async function () {
    await this.fetchRequests();
    await this.fetchOffers();
  }
};
</script>
