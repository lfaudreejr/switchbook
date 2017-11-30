<template>
  <div>

    <jumbotron></jumbotron>

    <b-container>
      <h2 class="features-title">Features:</h2>
        <b-row>
            <b-col>Manage a catalog of your books.</b-col>
            <b-col>See all books that users currently have.</b-col>
            <b-col>Ask to borrow books from others.</b-col>
        </b-row>
    </b-container>

  </div>
</template>
<script>
import jumbotron from '@/components/landing/Jumbotron'
export default {
  name: 'home',
  components: {jumbotron}
}
</script>
<style scoped>
.features-title {
  margin-top: 2rem;
  padding: 20px;
}
</style>
