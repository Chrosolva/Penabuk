<template>
  <b-container>
    <b-row>
      <div v-for="book in Books" :key="book.id">
        <b-col cols="12">
          <div>
            <b-card
              v-bind:title= book.original_title
              v-bind:img-src= book.image_url
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2"
            >
              <b-card-text>
                <p>{{book.title}}</p>
                <p>Rp. {{book.price}} Rating {{book.average_rating}}</p>
              </b-card-text>
              <div>
                <b-button href="#" variant="primary">Buy Now</b-button>
                <b-button href="#" variant="secondary">Add to WishList</b-button>
              </div>
            </b-card>
          </div>
        </b-col>
      </div>
    </b-row>
  </b-container>
</template>

<script>
// import Card from '@/views/Card.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      Books: []
    }
  },
  async mounted () {
    const bookresponse = await AuthenthicationService.getAllbooks()
    console.log(bookresponse.status)
    this.Books = bookresponse.data.books
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
