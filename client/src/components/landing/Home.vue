<template>
  <div>

    <jumbotron></jumbotron>

    <b-container fluid class="primary-bg text-dark">
      <h2 class="pt-5">Features:</h2>
        <b-row class="p-5">
            <b-col>Manage a catalog of your books.</b-col>
            <b-col class="feature">See all books that users currently have.</b-col>
            <b-col class="feature">Ask to borrow books from others.</b-col>
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
.feature {
  border-left: 1px solid black;
}
</style>
