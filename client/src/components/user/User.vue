<template>
  <div>
    <b-jumbotron>
      <p>{{title}}</p>
    </b-jumbotron>
    <b-container class="bv-example-row">
      <b-row>
          <b-col cols='md-2' v-for="book in books" :key="book._id">
            <b-card-group deck>
              <b-card class="mb-3">
                <div>
                  <img :src="book.image">
                  <p>{{book.title}}</p>
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
      ]
    }
  }

}
</script>

<style scoped>

</style>
