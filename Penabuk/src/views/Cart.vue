<template>
  <b-container fluid>
    <b-container style="margin-bottom:20px;">
      <div class="col-md-10" style="margin:10px auto;min-height:30px;">
        <h4 style="float:left;">Shopping Cart</h4>
        <div style="float:right;">
          <b-form-checkbox
            id="checkboxselectAll"
            name="checkboxselectAll"
            v-model="selectAllstatus"
            value="selectAll"
            unchecked-value="unselectAll"
          >
            Select All
          </b-form-checkbox>
        </div>
      </div>
      <div style="margin-bottom:20px;border:1px solid #181c21;margin:0 auto;" class="col-md-10">
        <b-row v-for="cart in carts" :key="cart.cart_id">
          <b-col cols="4">
            <div>
              <img :src="cart.Book.image_url" alt="book"
                style="margin:10px auto 30px auto;padding:0px;text-align:left;min-height:250px; min-width:200px;"/>
            </div>
          </b-col>
          <b-col>
            <div v-if="cart.Book" style="margin:0px;margin-top:15px;display:block;padding-bottom:10px;">
              <div class="col-sm-12">
                <p>
                  {{cart.Book.title}}
                </p>
                <P>
                  {{cart.Book.authors}}
                </P>
                <P>
                  Rp. {{cart.Book.price}}
                </P>
              </div>
              <div class="col-sm-12">
                <star-rating :rating="cart.Book.average_rating"
                  :read-only="true"
                  v-bind:increment="0.01"
                  v-bind:max-rating="5"
                  inactive-color="#999999"
                  active-color="#0b7fdd"
                  v-bind:star-size="30" style="color:#333333;display:block;"></star-rating>
              </div>
              <div class="col-sm-4">
                <label for="inputqty" style="font-size:16px;margin-top:20px;">Quantity</label>
                <b-form-input @change="hitung"
                  name="inputqty"
                  style="display:inline;padding: 0 5px;width:100px;text-align:right;"
                  type="number"
                  v-model="cart.count"/>
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
      carts: [],
      selectAllstatus: null
    }
  },
  methods: {
    search () {
    },
    hitung () {
    }
  },
  async mounted () {
    console.log(this.$store.state.token)
    const cartresponse = await AuthenthicationService.getallcarts(localStorage.getItem('token'))
    this.carts = cartresponse.data.carts
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p{
    text-align: left;
  }
</style>
