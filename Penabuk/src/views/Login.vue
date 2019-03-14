<template>
  <div align="center" class="p-5">
    <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false" v-html="error">
    </b-alert>
    <b-card title="Login"
            tag="article"
            style="max-width: 20rem;">
      <div>
      <b-form @submit="login($event)">
        <b-form-group label="email" align="left">
          <b-form-input type="email"
                        v-model="form.email"
                        required
                        placeholder="email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="password" align="left">
          <b-form-input type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>
        <a href="#" style="text-decoration:none;float:right;" class="nav-item">Forgot Password ?</a>
        <b-button type="submit" variant="primary" class="form-control">
          <icon name="sign-in" class="mr-1"></icon>
          Login
        </b-button>
      </b-form>
      <br/>
        <p class="align-center">Or</p>
        <b-nav-item href="#" :to="{name: 'register'}">
          <b-button variant="secondary" class="form-control">
            <icon name="user-plus" class="mr-1"></icon>
            Register
          </b-button>
        </b-nav-item>
    </div>
    </b-card>
  </div>
</template>

<script>
import AuthenthicationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      showDismissibleAlert: false
    }
  },
  methods: {
    async login (event) {
      event.preventDefault()
      var body = {
        email: this.form.email,
        password: this.form.password
      }
      try {
        const response = await AuthenthicationService.login(body)
        this.$store.dispatch('setToken', response.data.user.id)
        this.$store.dispatch('setUser', response.data.user)
        this.error = null
        localStorage.setItem('token', this.$store.state.token)
        localStorage.setItem('user', JSON.stringify(this.$store.state.user))
        this.$router.push({name: 'DashBoard'})
      } catch (err) {
        this.showDismissibleAlert = true
        this.error = err.response.data.message
      }
    }
  },
  mounted () {
    console.log(this)
  }
}
</script>

<style scoped>
.nav-link {
  padding:0px;
}
.nav-item {
  margin-bottom: 7px;
  padding: 0px;
  margin-left: 0px;
  margin-right: 0px;
  display: block;
}
li.nav-item {
  list-style-type: none;
}

.btn {
  padding: 0px;
}

</style>
