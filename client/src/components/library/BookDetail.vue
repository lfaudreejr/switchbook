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
          <b-list-group-item v-for="owner in book.owners" :key="owner" v-b-modal.modalPrevent="owner !== profile ? 'myModal' : ''" class="owner-list">
            {{owner}}

            <!-- the modal -->
            <b-modal id="myModal" @ok="requestTrade(book, owner)">
            <b-form>
              <p>Select a book to trade.</p>
              <b-row>
                <b-col v-for="userbook in userBooks" :key="userbook._id">
                  <b-card class="mb-3">
                    <b-form-checkbox-group v-model="selectedToTrade">
                      <b-img thumnail  :src="userbook.volumeInfo.imageLinks.thumbnail"></b-img>
                      <b-form-checkbox id="checkvalue" :value='userbook'>Select</b-form-checkbox>
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
import ApiService from '../../api';
import BookTradeModal from './BookTradeModal.vue';

const api = new ApiService();

export default {
  name: 'bookdetail',
  props: ['profile'],
  components: {
    BookTradeModal
  },
  data () {
    return {
      title: 'Books detail',
      book: null,
      usersBooks: null,
      selectedToTrade: null
    };
  },
  computed: {
    userBooks () {
      return this.usersBooks;
    }
  },
  methods: {
    async requestTrade (book, owner) {
      const request = {
        requestedBook: book,
        currentOwner: owner,
        bookOffered: this.selectedToTrade[0]
      };
      await api.submitATrade(request);
      this.selectedToTrade = null;
      this.$router.push('/user');
    },
    async fetchBook () {
      const data = await api.getBookById(this.$route.params.id);
      this.book = data.data;
    },
    async fetchUserBooks () {
      const data = await api.getBooksByUser();
      this.usersBooks = data.data;
    }
  },
  created: async function () {
    await this.fetchBook();
    await this.fetchUserBooks();
  },
  watch: {
    '$route': ['fetchBook', 'fetchUserBooks']
  }
};
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
