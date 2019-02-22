<template>
  <div class="container col-5">
    <b-card>
      <b-card-text>
        Lalala
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'Card',
  components: {
  },
  methods: {

  },
  data () {
    return {
      id: null,
      original_title: null,
      image_url: null,
      price: null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  margin-top: 20px;
}
</style>
