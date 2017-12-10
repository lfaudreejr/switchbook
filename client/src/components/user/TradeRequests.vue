<template>
  <div>
    <h1>Hello</h1>
    <p>{{offers}}</p>
    <p>{{requests}}</p>
  </div>
</template>

<script>
import ApiService from '../../api'
const api = new ApiService()

export default {
  data () {
    return {
      title: 'BLAH',
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
    }
  },
  created: function () {
    this.fetchRequests()
    this.fetchOffers()
  }
}
</script>
