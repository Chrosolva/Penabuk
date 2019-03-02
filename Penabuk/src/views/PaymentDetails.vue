<template>
  <b-container>
    <b-row>
      <b-col>
        <b-col cols="12" v-if="this.book">
          <div class="col-10" style="margin-right:0px;display:inline;">
            <img :src="this.book.image_url" alt="book"
                  style="margin-right:10px;padding:0px;float:left;"/>
          </div>
          <p>
            {{this.book.title}}
          </p>
          <P>
            {{this.book.authors}}
          </P>
          <P>
            Rp. {{this.book.price}}
          </P>
          <star-rating :rating="this.book.average_rating"
              :read-only="true"
              v-bind:increment="0.01"
              v-bind:max-rating="5"
              inactive-color="#999999"
              active-color="#0b7fdd"
              v-bind:star-size="30" style="color:#fefefe;"></star-rating>
        </b-col>
      </b-col>
      <b-col>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      book: null
    }
  },
  methods: {
    hehe () {
      console.log(this.book)
    }
  },
  mounted () {
    this.book = this.$route.params.book
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    text-align: left;
  }
</style>
