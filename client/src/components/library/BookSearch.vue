<template>
  <div>
    <b-card v-if="book">
      <div class="mb-5 mt-5">
        <img :src='book.volumeInfo.imageLinks.thumbnail'>
        <h3>{{book.volumeInfo.title}}</h3>
        <p v-for="author in book.volumeInfo.authors" :key="author"  class="small">{{author}}</p>
      </div>
      <b-button @click="addBook" class="primary-bg">Add Book</b-button>
    </b-card>

  </div>
</template>

<script>
import ApiService from '../../api';
const api = new ApiService();

export default {
  name: 'booksearch',
  props: {
    search: {
      type: Object
    }
  },
  data () {
    return {
      book: null
    };
  },
  methods: {
    async searchForBook () {
      let foundBook = await api.findABook(this.$route.query);
      this.book = foundBook.data;
    },
    async addBook () {
      await api.submitBook(this.$route.query);
      this.$router.push('/user');
    }
  },
  created: async function () {
    await this.searchForBook();
  },
  watch: {
    '$route': 'searchForBook'
  }
};
</script>

<style>

</style>
