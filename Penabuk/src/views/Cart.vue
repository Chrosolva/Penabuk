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
            @change="toggleAll"
            switch
          >
            Select All
          </b-form-checkbox>
        </div>
      </div>
      <div style="margin-bottom:20px;border:1px solid #181c21;margin:0 auto;" class="col-md-10">
        <b-row v-for="cart in carts" :key="cart.cart_id">
          <b-col cols="4" v-if="cart">
            <div>
              <img :src="cart.Book.image_url" alt="book"
                style="margin:10px auto 30px auto;padding:0px;text-align:left;min-height:250px; min-width:200px;"/>
            </div>
          </b-col>
          <b-col v-if="cart">
            <div v-if="cart.Book" style="margin:0px;margin-top:15px;display:block;padding-bottom:10px;">
              <div class="col-sm-12">
                <div style="float:right;">
                  <b-form-checkbox
                    @change="addtoArray(cart.cart_id, cart.count, cart.Book, cart.Book.title, cart.Book.price)"
                    v-bind:id="cart.Book.title"
                    v-bind:name="cart.Book.title"
                    value="select"
                    switch
                    unchecked-value="unselect"
                  ></b-form-checkbox>
                </div>
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
              <div class="col-sm-12">
                <div class="col-sm-8" style="text-align:left;padding:0;margin:0;float:left;">
                  <label for="inputqty" style="font-size:16px;margin-top:20px;">Quantity</label>
                  <b-form-input @change="hitung"
                    name="inputqty"
                    style="display:inline;padding: 0 5px;width:100px;text-align:right;"
                    type="number"
                    v-model="cart.count"/>
                </div>
                <div style="float:right;">
                  <b-button variant="danger" @click="removecart(cart.cart_id)" style="float:right;">
                    <icon name="trash" class="mr-1"></icon>
                  </b-button>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col><p class="form-control">Total {{this.totalcount}} items</p></b-col>
          <b-col><p class="form-control">Total Price Rp.{{this.totalprice}}</p></b-col>
          <b-col>
            <b-nav-item href="#" @click="buy" style="list-style-type:none;">
              <b-button variant="primary">
                <icon name="dollar" class="mr-1"></icon>Proceed to Payment
              </b-button>
            </b-nav-item>
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
      selectAllstatus: false,
      selectedCart: [],
      indeterminate: false,
      selectstatus: [],
      selected: false,
      totalcount: 0,
      totalprice: 0
    }
  },
  methods: {
    search () {
    },
    hitung () {
    },
    addtoArray (cartid, cartcount, cartbook, checkboxid, price) {
      if (this.checkAll()) {
        document.getElementById('checkboxselectAll').checked = true
        this.toggleAll()
      } else {
        document.getElementById('checkboxselectAll').checked = false
        var x = document.getElementById(checkboxid).checked
        console.log(x)
        var priced
        if (x) {
          var order = {
            cart_id: cartid,
            book: cartbook,
            count: cartcount
          }
          this.selectedCart.push(order)
          this.totalcount += cartcount
          priced = cartcount * price
          this.totalprice += priced
        } else {
          var removeIndex = this.selectedCart.map(function (item) { return item.cart_id }).indexOf(cartid)
          this.selectedCart.splice(removeIndex, 1)
          this.totalcount -= cartcount
          priced = cartcount * price
          this.totalprice -= priced
        }
        console.log(this.selectedCart)
      }
    },
    toggleAll () {
      var x = document.getElementById('checkboxselectAll').checked
      this.selectedCart = []
      this.totalcount = 0
      this.totalprice = 0
      var price
      console.log(x)
      for (var i = 0; i < this.carts.length; i++) {
        if (x) {
          document.getElementById(this.carts[i].Book.title).checked = true
          var order = {
            cart_id: this.carts[i].cart_id,
            book: this.carts[i].Book,
            count: this.carts[i].count
          }
          this.selectedCart.push(order)
          this.totalcount += this.carts[i].count
          price = this.carts[i].count * this.carts[i].Book.price
          this.totalprice += price
        } else {
          document.getElementById(this.carts[i].Book.title).checked = false
          var removeIndex = this.selectedCart.map(function (item) { return item.cart_id }).indexOf(this.carts[i].cart_id)
          this.selectedCart.splice(removeIndex, 1)
        }
      }
      console.log(this.selectedCart)
    },
    buy () {
      if (this.selectedCart.length !== 0) {
        this.$router.push({name: 'PaymentDetails', params: {orders: this.selectedCart}})
      } else {
        console.log('select an item')
      }
    },
    checkAll: function () {
      var all = true
      for (var i = 0; i < this.carts.length; i++) {
        if (!document.getElementById(this.carts[i].Book.title).checked) {
          all = false
        }
      }
      return all
    },
    async removecart (id) {
      try {
        await AuthenthicationService.removecarts(id, this.$store.state.token)
        this.$router.push({name: 'Cart', query: {token: this.$store.state.token}})
      } catch (err) {
        console.log(err.response.data.message)
      }
    }
  },
  async mounted () {
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
  .nav-link {
    padding:0;
  }
</style>
