<template>
  <div align="center" class="p-2">
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
    <b-card title="Register"
            tag="article"
            style="max-width: 20rem;">
      <div>
      <b-form @submit="register">
        <b-form-group label="email" align="left">
          <b-form-input type="email"
                        v-model="form.email"
                        required
                        placeholder="email">
          </b-form-input>
        </b-form-group>
        <b-form-group label="name" align="left">
          <b-form-input type="text"
                        v-model="form.name"
                        required
                        placeholder="Name">
          </b-form-input>
        </b-form-group>
        <b-form-group label="phone number" align="left">
          <b-form-input type="text"
                        v-model="form.phone_number"
                        required
                        placeholder="Phone Number">
          </b-form-input>
        </b-form-group>
        <b-form-group label="password" align="left">
          <b-form-input type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
          </b-form-input>
        </b-form-group>
        <b-form-group label="confirm password" align="left">
          <b-form-input type="password"
                        v-model="form.confirmpassword"
                        required
                        placeholder="Confirm Password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="form-control">
          <icon name="user-plus" class="mr-1"></icon>
          Register
        </b-button>
        <p style="text-align:center; margin-top:10px; margin-bottom:0px;float:left;">
          Already have an account ?
        </p>
        <b-nav-item href="#" :to="{name: 'login'}" style="list-style-type:none;float:right;margin-top:0px;display:inline;" class="nav-item">Sign In</b-nav-item>
      </b-form>
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
        password: '',
        name: '',
        phone_number: '',
        confirmpassword: ''
      },
      error: null,
      showError: false,
      success: null,
      showSuccess: false
    }
  },
  methods: {
    async register () {
      if (this.form.password === this.form.confirmpassword) {
        this.error = null
        this.showError = false
        var body = {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          phone_number: this.form.phone_number
        }
        try {
          await AuthenthicationService.register(body)
          this.error = null
          this.showError = false
          this.success = this.form.email + ' is successfully registered.'
          this.showSuccess = true
          this.form.email = ''
          this.form.password = ''
          this.form.name = ''
          this.form.confirmpassword = ''
          this.form.phone_number = ''
        } catch (err) {
          this.error = err.response.data.error
          this.showError = true
          this.success = null
          this.showSucess = false
        }
      } else {
        this.error = 'Password tidak sama dengan confirm password'
        this.showError = true
        this.success = null
        this.showSucess = false
      }
    }
  }
}
</script>
