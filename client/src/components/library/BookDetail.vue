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
          <b-list-group-item v-for="owner in book.owners" :key="owner" v-b-modal.modalPrevent="'myModal'" class="owner-list">
            {{owner}}

            <!-- the modal -->
            <b-modal id="myModal" @ok="requestTrade(book._id, owner)">
            <b-form>
              <p>Select a book to trade.</p>
              <b-row>
                <b-col v-for="userbook in usersBooks" :key="userbook._id">
                  <b-card class="mb-3">
                    <b-form-checkbox-group v-model="selectedToTrade">
                      <b-img thumnail  :src="userbook.volumeInfo.imageLinks.thumbnail"></b-img>
                      <b-form-checkbox id="checkvalue" :value='userbook._id'>Select</b-form-checkbox>
                    </b-form-checkbox-group>
                  </b-card>
                </b-col>
              </b-row>
            </b-form>
            </b-modal>

          </b-list-group-item>
        </b-list-group>
      </div>
    </b-card>
  </div>
</template>
<script>
import ApiService from '../../api'
import BookTradeModal from './BookTradeModal.vue'

const api = new ApiService()

export default {
  name: 'bookdetail',
  components: {
    BookTradeModal
  },
  data () {
    return {
      title: 'Books detail',
      book: null,
      selectedToTrade: null
    }
  },
  computed: {
    usersBooks () {
      const userBooks = localStorage.getItem('user_books')
      return JSON.parse(userBooks)
    }
  },
  methods: {
    requestTrade (book, owner) {
      console.log('book', book)
      console.log('owner', owner)
      console.log('selected', this.selectedToTrade)
    },
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
  background-color: #f8f9fa;
}
</style>
