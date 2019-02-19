<template>
  <b-container>
    <h3>Hello</h3>
  </b-container>
</template>

<script>
import Card from '@/views/Card.vue'

export default {
  components: {
    Card
  },
  data () {
    return {
      Books: [
        {
          id: null,
          authors: null,
          image_url: null,
          price: null
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
