<template>
  <div>
    <b-card>
      <div class="mb-5 mt-5">
        <img :src='book.image'>
        <h3>{{book.title}}</h3>
        <p v-for="author in book.authors" :key="author"  class="small">{{author}}</p>
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
const BOOK = {
  _id: 'cWAF8_uH1_sC',
  title: 'Shogun',
  authors: [ 'James Clavell' ],
  description: 'A bold English adventurer. An invincible Japanese warlord. A beautiful woman torn between two ways of life, two ways of love. All brought together in an extraordinary saga of a time and a place aflame with conflict, passion, ambition, lust, and the struggle for power... From the Paperback edition.',
  image: 'http://books.google.com/books/content?id=cWAF8_uH1_sC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72aj9MgUz4ivFEKtwt_D4BOPxvN084Q0rCjC_l7vOmHcfgGody4HQz2y8F7Cj94fiJ49ONYhZfVfzshKbaB_gTfB3wm4iQznKjj-2D1J7hTULG6nbsj84uq5T2mMP7Y6k9rTNbC&source=gbs_api',
  owners: [
    'Larry', 'Katie', 'Steve'
  ]
}

export default {
  name: 'bookdetail',
  data () {
    return {
      title: 'Books detail',
      book: BOOK
    }
  },
  methods: {
    requestTrade () {}
  }
}
</script>

<style scoped>
.owner-list {
  cursor: pointer;
}
.owner-list:hover {
  cursor: pointer;
  background-color: #00D2FF;
  color: white;
}
</style>
