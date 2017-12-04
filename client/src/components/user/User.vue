<template>
  <div>
    <b-jumbotron class="bg-light mb-0" fluid>
      <h4>{{title}}</h4>
    </b-jumbotron>

    <!-- <b-container class="header secondary-bg text-white" fluid>
      <b-row>
        <b-col>
          <h4 class="mb-5">Current requested trades:</h4>
          <p>{{trades}}</p>
        </b-col>
      </b-row>
    </b-container> -->
    <div>
      <b-alert v-if='trades[0] === 0' variant='danger' class="mb-0" show>
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

    <b-container class="bg-dark p-5 text-white" fluid>
      <h4 class="mb-5">Currently owned books:</h4>
      <b-row>
          <b-col cols='md-2' v-for="book in books" :key="book._id">
            <b-card-group deck>
              <b-card class="mb-3">
                <div>
                  <img :src="book.image">
                  <p>{{book.title}}</p>
                  <p v-for="author in book.authors" :key="author"  class="small">{{author}}</p>
                </div>
              </b-card>
            </b-card-group>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const BOOK = {
  _id: 'cWAF8_uH1_sC',
  title: 'Shogun',
  authors: [ 'James Clavell' ],
  description: 'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
  image: 'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72aj9MgUz4ivFEKtwt_D4BOPxvN084Q0rCjC_l7vOmHcfgGody4HQz2y8F7Cj94fiJ49ONYhZfVfzshKbaB_gTfB3wm4iQznKjj-2D1J7hTULG6nbsj84uq5T2mMP7Y6k9rTNbC&source=gbs_api'
}

export default {
  name: 'user',
  data () {
    return {
      title: 'Profile',
      books: [
        BOOK,
        BOOK,
        BOOK,
        BOOK,
        BOOK
      ],
      trades: [0],
      formText: null
    }
  }

}
</script>

<style scoped>

</style>
