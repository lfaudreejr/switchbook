<template>
  <b-form>
    <p>Select a book to trade.</p>
    <b-row>
      <b-col v-for="userbook in usersBooks" :key="userbook._id">
        <b-card class="mb-3">
          <b-form-checkbox-group v-model="selected">
            <b-img thumnail  :src="userbook.volumeInfo.imageLinks.thumbnail"></b-img>
            <b-form-checkbox id="checkvalue" :value='userbook._id'>Select</b-form-checkbox>
          </b-form-checkbox-group>
        </b-card>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
export default {
  name: 'booktrademodal',
  props: {
    selected: {
      default: []
    }
  },
  computed: {
    usersBooks () {
      const userBooks = localStorage.getItem('user_books');
      return JSON.parse(userBooks);
    }
  },
  watch: {
    selected: function () {
      console.log(this.selected);
    }
  }
};
</script>
