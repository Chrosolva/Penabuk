<template>
  <b-container>
    <b-row>
      <div v-for="book in books" :key="book.id">
        <b-col cols="12">
          <div>
            <b-card-group deck>
              <router-link :to="{name: 'BookDetailsNL',params:{ id: book.id}}">
                <b-card
                v-bind:title= book.original_title
                v-bind:img-src= book.image_url
                img-alt="Image"
                img-top
                tag="article"
                style="width: 250px;height:350px;"
                class="mb-2">
                <b-card-text v-bind:name="book.id">
                  <p>Rp. {{book.price}} Rating {{book.average_rating}}</p>
                </b-card-text>
                <div>
                  <!-- <b-nav-item @click="buy" style="list-style-type:none;float:left;">
                    <b-button href="#" variant="primary" style="display:inline;"><icon name="dollar" class="mr-1"></icon>Buy</b-button>
                  </b-nav-item>
                  <b-nav-item @click="buy(book.id)" style="list-style-type:none;float:right;">
                    <b-button href="#" variant="secondary" style="display:inline;"><icon name="cart-plus" class="mr-1"></icon>Cart</b-button>
                  </b-nav-item> -->
                </div>
              </b-card>
              </router-link>
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
  .card-deck>a {
    text-decoration: none;
  }
</style>
