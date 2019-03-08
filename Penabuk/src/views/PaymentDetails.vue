<template>
 <b-container style="min-height:550px;">
  <b-alert variant="danger"
             :show="showError"
             dismissible
             @dismissed="showError=false" v-html="error">
  </b-alert>
  <b-row>
    <b-col cols="8" style="margin:0px;margin-top:10px;border:1px solid #333333;">
      <div style="display:block;margin-top:15px;">
        <div v-if="this.book" class="col-sm-3" style="margin:10px;padding:10px;">
          <img :src="this.book.image_url" alt="book" class="col-2"
            style="object-fit:fill;margin-top:0px;margin-right:10px;;padding:0px;text-align:left;"/>
        </div>
        <div v-if="this.book" class="col-sm-9" style="margin:0px;margin-top:20px;display:block;padding-bottom:10px;float:right;">
          <p>
            {{this.book.title}}
          </p>
          <P>
            {{this.book.authors}}
          </P>
          <P>
            Rp. {{this.book.price}}
          </P>
          <div>
            <star-rating :rating="this.book.average_rating"
              :read-only="true"
              v-bind:increment="0.01"
              v-bind:max-rating="5"
              inactive-color="#999999"
              active-color="#0b7fdd"
              v-bind:star-size="30" style="color:#333333;float:left;"></star-rating>
            <div style="float:right;">
              <label for="inputqty" style="font-size:13px;">Jumlah item</label>
              <b-form-input @change="hitung"
                name="inputqty"
                style="display:inline;padding: 0 5px;width:100px;text-align:right;"
                type="number"
                v-model="count"/>
            </div>
          </div>
        </div>
      </div>
    </b-col>
    <b-col v-if="this.book" cols="4" style="margin:0px;margin-top:10px;">
      <div style="background-color:#ffffff;border:1px solid #333333;">
        <b-form @submit="payment($event)" v-if="this.book">
          <label class="form-control" style="color:#fefefe;background-color:#181c21">Payment Summary</label>
          <div style="margin:0 20px;">
            <p class="form-control text-left">Total Item <span style="float:right;">{{totalcount}}</span></p>
            <p class="form-control text-left">Total Price <span style="float:right;">{{totalprice}}</span></p>
            <b-form-group>
              <div>
                <div class="col-sm-12" style="margin:0px;padding:0px;">
                  <p style="margin:10px;"><strong>Address</strong></p>
                  <b-form-select id="Address" :options="this.AddressOptions" required v-model="selectedAddress"/>
                </div>
                <!-- <div class="col-sm-1" style="float:right;margin-right:25px;">
                  <b-link @click="showAddress"><icon name="plus-square" class="mr-1" scale="2"></icon></b-link>
                </div> -->
              </div>
              <br/>
              <p class="form-control text-left">Ongkos kirim <span style="float:right;">{{ongkir}}</span></p>
              <p class="form-control text-left">Total pembayaran <span style="float:right;">{{totalpayment}}</span></p>
              <b-button type="submit" variant="primary" class="form-control" style="margin-bottom:15px;">
                <icon name="dollar" class="mr-1"></icon>
                Konfirmasi pembayaran
              </b-button>
            </b-form-group>
          </div>
        </b-form>
      </div>
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  data () {
    return {
      book: null,
      AddressOptions: [],
      selectedAddress: null,
      count: 1,
      totalcount: 1,
      totalprice: 1,
      ongkir: 50000,
      totalpayment: 0,
      buybook: [],
      error: null,
      showError: false
    }
  },
  async mounted () {
    this.book = this.$route.params.book
    const addressresponse = await AuthenticationServices.getaddress(this.$store.state.token)
    console.log(addressresponse.data.addresses)
    for (var i = 0; i < addressresponse.data.addresses.length; i++) {
      this.AddressOptions.push({value: addressresponse.data.addresses[i].id, text: addressresponse.data.addresses[i].address_line + ' ' + addressresponse.data.addresses[i].district + ' ' + addressresponse.data.addresses[i].city + ' ' + addressresponse.data.addresses[i].province})
    }
    console.log(this.AddressOptions)
    console.log(this.book)
    this.totalcount = this.count
    this.totalprice = this.totalcount * this.book.price
    this.totalpayment = this.totalprice + this.ongkir
    console.log(this.totalprice)
  },
  methods: {
    async payment (event) {
      event.preventDefault()
      try {
        var body = {
          book_id: this.book.id,
          count: parseInt(this.count),
          address_id: this.selectedAddress
        }
        console.log(body)
        this.buybook.push(body)
        console.log(this.buybook)
        const response = await AuthenticationServices.payment(this.$store.state.token, this.buybook)
        console.log(response)
        console.log(response.data.message)
        this.$router.push({name: 'PaymentSuccess'})
      } catch (err) {
        this.showError = true
        this.error = 'Saldo tidak cukup'
      }
    },
    hitung () {
      this.totalcount = this.count
      this.totalprice = this.totalcount * this.book.price
      this.totalpayment = this.totalprice + this.ongkir
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    text-align: left;
    font-size: 13px;
  }
  .col-sm-3, .col-sm-8 {
    margin: 0px;
    display: inline;
  }
</style>
