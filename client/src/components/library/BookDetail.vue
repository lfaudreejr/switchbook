<template>
  <div>
    <b-card v-if="book">
      <div class="mb-5 mt-5">
        <img :src='book.volumeInfo.imageLinks.thumbnail'>
        <h3>{{book.volumeInfo.title}}</h3>
        <p v-for="author in book.volumeInfo.authors" :key="author"  class="small">{{author}}</p>
      </div>
      <div>
        <b-list-group>
          <h5>Owners of this book:</h5>
          <p class="small">Click an owner to request a trade.</p>
          <b-list-group-item v-for="owner in book.owners" :key="owner" @click="requestTrade()" class="owner-list">
            {{owner}}
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-card>
  </div>
</template>
<script>
import ApiService from '../../api'
const api = new ApiService()

export default {
  name: 'bookdetail',
  data () {
    return {
      title: 'Books detail',
      book: null
    }
  },
  methods: {
    requestTrade () {},
    async fetchBook () {
      const data = await api.getBookById(this.$route.params.id)
      this.book = data.data
    }
  },
  created: function () {
    this.fetchBook()
  },
  watch: {
    '$route': 'fetchBook'
  }
}
</script>

<style scoped>
.owner-list {
  cursor: pointer;
}
.owner-list:hover {
  cursor: pointer;
  background-color: #9a67ea;
  color: white;
}
</style>
