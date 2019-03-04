<template>
  <b-container class="col-md-8" style="background-color:#FFFFFF;">
    <b-row>
      <b-col>
        <div class="profile" style="margin-top:20px;float:left;">
          <h5 v-if="this.$store.state.user" style="text-align:left;display:inline;">{{this.$store.state.user.name}}</h5>
          <b-link href="#"><icon name="edit" class="mr-1" style="text-align:left;"></icon></b-link>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="this.$store.state.user">
        <p style="text-align:left;color:#888888;">email :{{this.$store.state.user.email}}</p>
        <p style="text-align:left;color:#888888;">phone : {{this.$store.state.user.phone_number}}</p>
      </b-col>
      <b-col v-if="this.$store.state.user">
        <p style="text-align:left;color:#888888;">balance : {{this.$store.state.user.balance}}</p>
        <p style="text-align:left;color:#888888;">Joined at {{this.$store.state.user.createdAt}}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <hr/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-link style="color:#f8f9fa;" @click="showAddAddress"><icon name="plus-square" id="icon1" class="mr-2" scale="1.5" style="float:right;margin-top:7px;"></icon></b-link>
        <p class="form-control address-title">Alamat pengiriman</p>
        <div v-for="address in this.addressess" :key="address.id">
          <p class="form-control">{{address.address_line}},{{address.city}},{{address.zip_code}}</p>
        </div>
      </b-col>
      <b-col>
        <b-form @submit="AddAddress" id="address" style="display:none;">
          <h5 class="text-left">Tambah Alamat</h5>
          <b-form-input type="text"
                        v-model="street"
                        required
                        placeholder="Alamat rumah">
          </b-form-input>
          <b-form-group id="Provinsi-group" label="Provinsi" label-for="Provinsi">
            <b-form-select v-if="this.provinceOptions" id="Provinsi" :options="this.provinceOptions" @change="getkota" required v-model="selectedprovince" />
          </b-form-group>
          <b-form-group id="Cities-group" label="Kota" label-for="Kota">
            <b-form-select v-if="kotaOptions" id="Kota" @change="getdistrict" :options="this.kotaOptions" required v-model="kota" />
          </b-form-group>
          <b-form-group id="Districts-group" label="Kecamatan" label-for="Kecamatan">
            <b-form-select v-if="kotaOptions" id="Kecamatan" @change="getdistrict" :options="this.districtOptions" required v-model="district" />
          </b-form-group>
          <b-form-input type="text" v-model="zipcode" required placeholder="Kode Pos">
          </b-form-input>
          <br/>
          <b-button type="submit" variant="primary" class="form-control">
            <icon name="plus-square" class="mr-1"></icon>
            Tambah Alamat
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AuthenticationServices from '@/services/AuthenticationService'
export default {
  data () {
    return {
      addressess: [],
      street: null,
      selectedprovince: null,
      provinceOptions: [],
      kota: null,
      kotaOptions: [],
      district: null,
      districtOptions: [],
      zipcode: null
    }
  },
  async mounted () {
    const addressresponse = await AuthenticationServices.getaddress(this.$store.state.token)
    console.log(addressresponse.data.addresses)
    this.addressess = addressresponse.data.addresses
    const provinceresponse = await AuthenticationServices.getprovince()
    for (var i = 0; i < provinceresponse.data.provinces.length; i++) {
      this.provinceOptions.push({value: provinceresponse.data.provinces[i].id, text: provinceresponse.data.provinces[i].name})
    }
    console.log(this.provinceOptions)
  },
  methods: {
    showAddAddress () {
      var x = document.getElementById('address')
      if (x.style.display === 'none') {
        x.style.display = 'block'
      } else {
        x.style.display = 'none'
      }
    },
    async AddAddress () {
      console.log(this.district)
      console.log(this.address)
      console.log(this.zipcode)
      var body = {
        district_id: this.district,
        address_line: this.street,
        zip_code: this.zipcode
      }
      console.log(body)
      try {
        console.log('this is token ' + this.$store.state.token)
        const response = await AuthenticationServices.addaddress(this.$store.state.token, body)
        console.log(response.data.message)
      } catch (err) {
        console.log('Alamat tidak berhasil ditambah')
      }
    },
    async getkota () {
      const citiesresponse = await AuthenticationServices.getkota(this.selectedprovince)
      if (this.kotaOptions != null) {
        this.kotaOptions = []
      }
      for (var i = 0; i < citiesresponse.data.cities.length; i++) {
        this.kotaOptions.push({value: citiesresponse.data.cities[i].id, text: citiesresponse.data.cities[i].name})
      }
    },
    async getdistrict () {
      if (this.districtOptions != null) {
        this.districtOptions = []
      }
      const districtresponse = await AuthenticationServices.getcamat(this.kota)
      for (var i = 0; i < districtresponse.data.districts.length; i++) {
        this.districtOptions.push({value: districtresponse.data.districts[i].id, text: districtresponse.data.districts[i].name})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    border:2px solid #efefef;
  }

  .address-title {
    background-color:#28a745;
    color: aliceblue;
  }
</style>
