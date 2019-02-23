<template>
  <b-container>
    <b-row>
      <div v-for="book in books" :key="book.id">
        <b-col cols="12">
          <div>
            <b-card-group deck>
              <b-card
                v-bind:title= book.original_title
                v-bind:img-src= book.image_url
                img-alt="Image"
                img-top
                tag="article"
                style="width: 250px;height:350px;"
                class="mb-2"
              >
                <b-card-text>
                  <p>Rp. {{book.price}} Rating {{book.average_rating}}</p>
                </b-card-text>
                <b-button href="#" variant="primary" style="float:left;display:inline;">Buy Now</b-button>
                <b-button href="#" variant="secondary" style="float:right;display:inline;"><icon name="cart-plus" class="mr-1"></icon>WishList</b-button>
              </b-card>
            </b-card-group>
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
      books: []
    }
  },
  async mounted () {
    const bookresponse = await AuthenthicationService.getAllbooks()
    console.log(bookresponse.status)
    this.books = bookresponse.data.books
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-img-top {
    height: 200px;
  }
  .card-title, b-card-text{
    font-size: 14px;
    padding:0px;
    margin:0px;
  }
</style>
