<template>
  <b-container>
    <b-row>
      <b-col v-if="this.book" id="bookdetail" style="margin-top:10px;padding:0px;margin-bottom:10px;background-color:#fefefe;border:3px solid #efefef;">
        <div class="col-md-2" style="float:left;">
          <img :src="this.book.image_url" alt="book"
                style="object-fit:fill;margin:0px;padding:0px;"/>
        </div>
        <div class="col-md-9" style="margin-left:10px;float:left;">
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
        </div>
      </b-col>
      <b-col id="paymentdetail" cols="4">

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
  mounted () {
    this.book = this.$route.params.book
    console.log(this.$route.params.book)
    console.log(this.book)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  p {
    text-align: left;
  }
</style>
