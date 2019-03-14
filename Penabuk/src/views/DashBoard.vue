<template>
  <b-container fluid style="margin:0px;padding:0px;">
    <div style="background-color:#888888;width:100%;margin:0px;padding:10px 0;">
      <div class="col-md-10" style="margin:20px auto 20px auto;min-height:60px;">
        <div class="col-md-10" style="margin:0 55px 0 auto;padding:0 auto;">
          <div style="float:left;width:40px;">
            <b-dropdown text="All" size="sm" variant ="dark" style="height:38px;">
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
      <b-container>
        <div class="col-md-10" style="margin:0 auto 20px auto;">
          <b-carousel id="carousel1"
                      style="text-shadow: 1px 1px 2px #333;"
                      controls
                      indicators
                      :interval="2500"
                      v-model="slide"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd">
            <b-carousel-slide style="margin:0 auto;">
              <img slot="img" class="d-block img-fluid w-100" style="height:300px !important;"
                  src="https://quotefancy.com/media/wallpaper/3840x2160/24042-Albert-Einstein-Quote-Any-fool-can-know-The-point-is-to-understand.jpg" alt="image slot">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" style="height:300px !important;background-size:cover !important"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Rn5siUuXriZcq6_kaxRCHwDrn1BbaPNCCvVo4Dv4pMPc5caASA" alt="image slot">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" style="height:300px !important;background-size:cover !important"
                  src="https://www.bffquotes.pics/images/quotes/english/drapj-abdul-kalam/one-best-book-is-equal-52650-18355.jpg" alt="image slot">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" style="height:300px !important;background-size:cover !important"
                  src="https://quotefancy.com/media/wallpaper/3840x2160/2222576-Carl-Sagan-Quote-Books-permit-us-to-voyage-through-time-to-tap-the.jpg" alt="image slot">
            </b-carousel-slide>
            <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" style="height:300px !important;background-size:cover !important"
                  src="https://media.bookbub.com/wp-content/uploads/2015/06/Gaiman.jpg" alt="image slot">
            </b-carousel-slide>
          </b-carousel>
        </div>
      </b-container>
    </div>
    <b-container>
      <br/>
      <div style="min-height:30px;margin:10px auto;">
        <h5 style="float:left;margin-top:7px;">Recommended For You</h5>
        <b-link style="float:right;text-decoration:none;" href="#" :to="{ name: 'ViewAll'}">
          <b-button><icon name="search" class="mr-2"></icon>View All</b-button>
        </b-link>
      </div>
      <br/>
      <b-row>
        <div v-for="book in books" :key="book.id">
          <b-col style="margin:5PX 0 20PX 5px;">
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
  </b-container>
</template>

<script>
// import Card from '@/views/Card.vue'
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      books: [],
      slide: 0,
      sliding: null,
      searchText: null
    }
  },
  async mounted () {
    const bookresponse = await AuthenthicationService.getAllbooks()
    console.log(bookresponse.status)
    this.books = bookresponse.data.books
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = false
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    search () {
    }
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
