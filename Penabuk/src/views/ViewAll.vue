<template>
  <b-container fluid>
    <div class="col-md-10" style="margin:20px auto 20px auto;min-height:60px;">
      <div class="col-md-10" style="margin:0 55px 0 auto;padding:0 auto;">
        <div style="float:left;width:40px;">
          <b-dropdown text="All" size="sm" variant ="secondary" style="height:38px;">
            <b-dropdown-item href="#" size="sm">
              Tag 1
            </b-dropdown-item>
            <b-dropdown-item href="#" size="sm">
              Tag 2
            </b-dropdown-item>
            <b-dropdown-item href="#" size="sm">
              Tag 3
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div style="float:left;margin:0px;padding:0px;" class="col-sm-10">
          <b-form @submit="search" style="margin:0px;display:inline;">
            <b-form-group id="searchgroup">
              <b-form-input
              id="searchInput"
              type="text"
              v-model="searchText"
              required
              placeholder="Enter your search keywords here" />
            </b-form-group>
          </b-form>
        </div>
        <div style="float:left;">
          <b-button type="submit" variant="primary" style="float:right;">
            <icon name="search" class="mr-1"></icon>
          </b-button>
        </div>
      </div>
    </div>
    <b-container style="margin-bottom:20px;">
      <div style="margin-bottom:20px;border:1px solid #181c21;margin:0 auto;" class="col-md-10">
        <b-row v-for="book in books" :key="book.id">
          <b-col cols="4">
            <div>
              <img :src="book.image_url" alt="book"
                style="margin:10px auto 30px auto;padding:0px;text-align:left;min-height:250px; min-width:200px;"/>
            </div>
          </b-col>
          <b-col>
            <div v-if="book" style="margin:0px;margin-top:15px;display:block;padding-bottom:10px;">
              <div class="col-sm-12">
                <p>
                  {{book.title}}
                </p>
                <P>
                  {{book.authors}}
                </P>
                <P>
                  Rp. {{book.price}}
                </P>
              </div>
              <div class="col-sm-12">
                <star-rating :rating="book.average_rating"
                  :read-only="true"
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  inactive-color="#999999"
                  active-color="#0b7fdd"
                  v-bind:star-size="30" style="color:#333333;display:block;"></star-rating>
              </div>
              <div class="col-sm-5" style="margin-top:10px;padding:0px;">
                <b-nav-item @click="viewdetails(book.id)" v-bind:book="book" style="list-style-type:none;">
                  <b-button href="#" variant="primary" class="form-control">
                    <icon name="search" class="mr-1"></icon>View Details
                  </b-button>
                </b-nav-item>
                <b-nav-item style="list-style-type:none;">
                  <b-button href="#" variant="secondary" class="form-control">
                    <icon name="cart-plus" class="mr-1"></icon>Cart
                  </b-button>
                </b-nav-item>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </b-container>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      searchText: null,
      books: []
    }
  },
  methods: {
    search () {
    },
    viewdetails (bookid) {
      if (!this.$store.state.isUserLoggedIn) {
        this.$router.push({name: 'BookDetailsNL', params: {id: bookid}})
        console.log(this.$store.state.isUserLoggedIn)
      } else {
        console.log(this.$store.state.isUserLoggedIn)
        this.$router.push({name: 'BookDetails', params: {id: bookid, token: this.$store.state.token}})
      }
    }
  },
  async mounted () {
    const bookresponse = await AuthenthicationService.getAllbooks()
    console.log(bookresponse.data.books)
    this.books = bookresponse.data.books
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    text-align: left;
  }
</style>
