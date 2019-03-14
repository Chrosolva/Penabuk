<template>
  <b-container fluid>
    <b-navbar toggleable="sm" style="background-color:#2E8B57;">
      <b-container>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="#" :to="{ name: 'DashBoard'}"> Penabuk </b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">History</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">Cart</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">Top Up</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">Profile</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">Best Deals</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" :to="{name: 'login'}" v-if="!$store.state.isUserLoggedIn">
              <icon name="sign-in" class="mr-1"></icon>
              Login
            </b-nav-item>
            <b-nav-item href="#" :to="{name: 'register'}" v-if="!$store.state.isUserLoggedIn">
                <icon name="user-plus" class="mr-1"></icon>
                Register
            </b-nav-item>
            <!-- <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">
                <div v-if="$store.state.user['role'] == 'admin'">
                <icon name="cogs" class="mr-1"></icon>
                Admin Configuration
                </div>
            </b-nav-item> -->
            <b-nav-item v-if="$store.state.isUserLoggedIn">
              <span style="color:#abf400;">Balance : Rp. {{this.$store.state.user.balance}}</span>
            </b-nav-item>
            <div>
              <b-dropdown v-bind:text="this.$store.state.user.name" variant ="primary" v-if="$store.state.isUserLoggedIn" size="sm">
                <b-dropdown-item href="#" :to="{name: 'Profile', params: {token: this.$store.state.token}}" size="sm">
                  <icon name="edit" class="mr-1"></icon>Edit Profile
                </b-dropdown-item>
                <b-dropdown-item href="#" size="sm">
                  <icon name="edit" class="mr-1"></icon>Change Password
                </b-dropdown-item>
                <b-dropdown-item href="#" @click="logout" size="sm">
                  <icon name="sign-out" class="mr-1"></icon>Log Out
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </b-container>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.push({name: 'login'})
    }
  },
  async mounted () {
    if (localStorage.getItem('token') != null) {
      const userresponse = await AuthenthicationService.getUser(localStorage.getItem('token'))
      console.log(userresponse.data.user)
      localStorage.setItem('token', userresponse.data.user.id)
      localStorage.setItem('user', JSON.stringify(userresponse.data.user))
      this.$store.dispatch('setToken', parseInt(localStorage.getItem('token')))
      this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    } else {
      console.log('not logged in')
    }
  }
}
</script>

<style scoped>
  .nav-link {
    color:#EEEEEE !important;
  }
  .container-fluid {
    padding-bottom: 10px;
    padding:0px;
    margin-left: 0px;
    margin-right: 0px;
  }
  .col-8 {
    margin:0px;
  }
</style>
