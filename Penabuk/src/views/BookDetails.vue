<template>
  <b-container>
    <div>
      <b-alert variant="danger"
             dismissible
             :show="showError"
             @dismissed="showError=false" v-html="error">
      </b-alert>
      <b-alert variant="success"
             dismissible
             :show="showSuccess"
             @dismissed="showSuccess=false" v-html="success">
      </b-alert>
    </div>
    <div class="mt-5 col-sm-5" style="background-color:#fefefe; margin:0 auto;">
      <b-row class="details">
        <b-col cols="sm-4" style="padding:0px; margin-left:0px;">
          <img v-if="book" :src="book.image_url" alt="book"
                class="col-sm-12"
                style="object-fit:fill;margin-top:0px;padding:0px;"/>
        </b-col>
        <b-col cols="sm-8" style="background-color:#181c21;padding-bottom:10px;">
          <div style="margin-top:15px;" v-if="book">
            <p>Judul buku: {{book.title}}</p>
            <p>Penulis : {{book.authors}}</p>
            <p>Tahun Terbit : {{book.original_publication_year}}</p>
            <star-rating :rating="book.average_rating"
              :read-only="true"
              v-bind:increment="0.01"
              v-bind:max-rating="5"
              inactive-color="#999999"
              active-color="#0b7fdd"
              v-bind:star-size="30" style="color:#fefefe;"></star-rating>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p style="color:black;display:inline;" v-if="$store.state.isUserLoggedIn">Rate this book
          </p>
        </b-col>
        <b-col>
          <star-rating v-if="$store.state.isUserLoggedIn && book"
            :rating="book.user_rating"
            :show-rating="false"
            @rating-selected="setRating"
            v-bind:increment="1"
            v-bind:max-rating="5"
            inactive-color="#999999"
            active-color="#0b7fdd"
            v-bind:star-size="30"></star-rating>
        </b-col>
        <b-col>
          <b-button variant="outline-primary" @click="Rate" v-if="$store.state.isUserLoggedIn">Rate</b-button>
        </b-col>
      </b-row>
      <b-row style="padding-bottom:10px;">
        <b-col>
          <b-nav-item @click="buy" v-bind:book="this.book" style="list-style-type:none;">
            <b-button href="#" variant="primary" style="float:left;display:inline;">
              <icon name="dollar" class="mr-1"></icon>Buy Now
            </b-button>
          </b-nav-item>
        </b-col>
        <b-col>
          <b-nav-item style="list-style-type:none;">
            <b-button href="#" variant="secondary" style="float:right;display:inline;">
              <icon name="cart-plus" class="mr-1"></icon>Cart
            </b-button>
          </b-nav-item>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  data () {
    return {
      book: null,
      rating: 0,
      userRating: null,
      bookid: this.$route.params.id,
      message: null,
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  async mounted () {
    const bookresponse = await AuthenticationServices.getBookbyId(this.bookid)
    this.book = bookresponse.data.book
    this.rating = bookresponse.data.book.average_rating
  },
  methods: {
    setRating: function (rating) {
      this.userRating = rating
    },
    async Rate () {
      var body = {
        book_id: this.book.id,
        rating: this.userRating || 0
      }
      try {
        console.log(body)
        const rate = await AuthenticationServices.ratebook(this.$store.state.token, body)
        this.error = null
        this.showError = false
        this.success = rate.message
        this.showSuccess = true
      } catch (err) {
        this.error = 'Rating buku tidak boleh 0'
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    },
    buy () {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({name: 'login'})
        console.log(this.$store.state.isUserLoggedIn)
      } else {
        console.log(this.$store.state.isUserLoggedIn)
        this.$router.push({name: 'PaymentDetails', params: {book: this.book}})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    color:#fefefe;
    text-align: left;
  }
  .container {
    margin-bottom: 40px;
  }

  .row {
    margin-bottom: 10px;
  }
  .details {
    width: auto;
  }
  .vue-star-rating {
    margin-left: 0px;
    padding-left: 0px;
  }
</style>
