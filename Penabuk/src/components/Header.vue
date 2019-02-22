<template>
  <b-container fluid>
    <b-navbar toggleable="md" style="background-color:#023847">
      <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item href="#" :to="{ name: 'DashBoard'}" actives> Penabuk </b-nav-item>
            <b-nav-item href="#" >Telusuri</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">Wish List</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">TOP UP</b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">HISTORY</b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" v-if="!$store.state.isUserLoggedIn">
                <icon name="sign-in" class="mr-1"></icon>
                Login
            </b-nav-item>
            <b-nav-item href="#" v-if="!$store.state.isUserLoggedIn">
                <icon name="user-plus" class="mr-1"></icon>
                Register
            </b-nav-item>
            <b-nav-item href="#" v-if="$store.state.isUserLoggedIn">
                <div v-if="$store.state.user['role'] == 'admin'">
                <icon name="cogs" class="mr-1"></icon>
                Admin Configuration
                </div>
            </b-nav-item>
            <b-nav-item href="#" @click="logout" v-if="$store.state.isUserLoggedIn">
                <icon name="sign-out" class="mr-1"></icon>
                Logout
            </b-nav-item>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style scoped>
  .nav-link {
    color:#EEEEEE !important;
  }
  .container {
    padding-right: 0px !important;
    padding-left: 0px !important;
  }
</style>
