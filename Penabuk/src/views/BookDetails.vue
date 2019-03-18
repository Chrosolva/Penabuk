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
    <div class="mt-5 col-md-10" style="background-color:#efefef; margin:0 auto;">
      <b-row class="details">
        <b-col cols="sm-4" style="padding:0px; margin-left:0px;background-color:#efefef;">
          <img v-if="book" :src="book.image_url" alt="book"
                class="col-sm-6"
                style="object-fit:fill;margin:20px auto;padding:0px;"/>
        </b-col>
        <b-col cols="sm-8" style="background-color:#efefef;padding-bottom:10px;">
          <div style="margin-top:30px;" v-if="book">
            <p>Judul buku: {{book.title}}</p>
            <p>Penulis : {{book.authors}}</p>
            <p>Tahun Terbit : {{book.original_publication_year}}</p>
            <star-rating :rating="book.average_rating"
              :read-only="true"
              v-bind:increment="0.01"
              v-bind:max-rating="5"
              inactive-color="#999999"
              active-color="#0b7fdd"
              v-bind:star-size="30" style="color:#181c21;"></star-rating>
          </div>
          <b-link style="list-style-type:none;width:20px;">
            <b-button href="#" variant="success" class="form-control col-sm-4" style="margin:20px 0;padding:0;float:left;">
              <icon name="cart-plus" class="mr-1"></icon>Cart
            </b-button>
          </b-link>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <h4 style="text-align:left;">Rate this book</h4>
          <hr class="btn-primary" style="height:1.2px;"/>
        </b-col>
      </b-row>
      <b-row v-if="this.book && this.book.user_rating===0">
        <b-col>
          <p v-if="!$store.state.isUserLoggedIn">Login to Rate and Review the book</p>
          <b-form @submit="Rate($event)" v-if="this.book && this.book.user_rating===0">
            <star-rating v-if="$store.state.isUserLoggedIn && this.book && this.book.user_rating===0"
              :rating="this.book.user_rating"
              :show-rating="false"
              @rating-selected="setRating"
              v-bind:increment="1"
              v-bind:max-rating="5"
              inactive-color="#999999"
              active-color="#0b7fdd"
              v-bind:star-size="25" style="margin-left:10px;margin-bottom:20px;"></star-rating>
            <b-form-group>
              <b-form-input type="text"
                            v-model="reviewText"
                            required
                            v-if="$store.state.isUserLoggedIn"
                            placeholder="Description Here">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" style="float:right;" v-if="$store.state.isUserLoggedIn">
              Submit
            </b-button>
          </b-form>
        </b-col>
        <!-- <b-col>
          <b-button variant="outline-primary" @click="Rate" v-if="$store.state.isUserLoggedIn">Rate</b-button>
        </b-col> -->
      </b-row>
      <hr class="btn-primary" style="height:1 px;" v-if="this.book && this.book.user_rating===0"/>
      <b-row style="padding-bottom:10px;">
        <b-col>
          <div style="display:inline;float:left;">
            <label for="inputqty" style="font-size:13px;">Jumlah item</label>
            <b-form-input @change="showcount"
              name="inputqty"
              style="display:inline;padding: 0 5px;width:100px;text-align:right;"
              type="number"
              v-model="count"/>
          </div>
          <div style="float:left;margin-left:10px;">
            <b-nav-item href="#" @click="buy" style="list-style-type:none;">
              <b-button variant="primary" style="display:inline;">
                <icon name="dollar" class="mr-1"></icon>Proceed to Payment
              </b-button>
            </b-nav-item>
          </div>
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
      bookid: null,
      message: null,
      error: null,
      showError: false,
      success: null,
      showSuccess: false,
      reviewText: null,
      count: 1,
      bookresponse: null
    }
  },
  async mounted () {
    this.bookid = this.$route.params.id
    if (!this.$store.state.token) {
      this.bookresponse = await AuthenticationServices.getBookbyId(this.bookid)
    } else if (this.$store.state.token) {
      this.bookresponse = await AuthenticationServices.getBookbyIdL(this.bookid, this.$store.state.token)
    }
    this.book = this.bookresponse.data.book
    console.log('ini buku')
    console.log(this.book)
    this.rating = this.bookresponse.data.book.average_rating
    this.userRating = this.bookresponse.data.book.user_rating
    console.log(this.bookresponse.data.book.user_rating)
  },
  methods: {
    setRating: function (rating) {
      this.userRating = rating
    },
    async Rate (event) {
      event.preventDefault()
      if (this.userRating != null) {
        var body = {
          book_id: this.book.id,
          rating: this.userRating,
          review: this.reviewText
        }
        try {
          console.log(body)
          const rate = await AuthenticationServices.ratebook(this.$store.state.token, body)
          this.message = rate.data.message
          this.error = null
          this.showError = false
          this.success = rate.data.message
          this.showSuccess = true
        } catch (err) {
          this.error = 'Rating buku tidak boleh 0'
          this.showError = true
          this.success = null
          this.showSucess = false
        }
      } else {
        this.error = 'Rating buku harus diisi'
        this.showError = true
        this.success = null
        this.showSuccess = false
      }
    },
    buy () {
      console.log(this.book)
      console.log('ini count' + this.count)
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({name: 'login'})
        console.log(this.$store.state.isUserLoggedIn)
      } else {
        console.log(this.$store.state.isUserLoggedIn)
        this.$router.push({name: 'PaymentDetails', params: {book: this.book, count: this.count}})
      }
    },
    showcount () {
      console.log(this.count)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    color:#181c21;
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
  a.nav-link {
    padding:0;
  }
</style>
