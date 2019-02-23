<template>
  <b-container fluid>
    <footer class="container">
      <b-row>
        <b-col cols="3">
          <ul style="list-style-type:none;text-align:left;" class="col-12 col-xs-6">
            <li><h6 style="margin-top:35px;">Penabuk</h6></li>
            <li><small>Penjualan Aneka Buku</small></li>
            <li><small>Situs untuk anda yang hobi membaca buku</small></li>
            <li><small>Telusuri lebih dalam minat membaca anda bersama penabuk</small></li>
          </ul>
        </b-col>
        <b-col cols="3">
          <ul style="list-style-type:none;text-align:left;" class="col-12 col-xs-6">
            <li><h6 style="margin-top:35px;">Help</h6></li>
            <li><a href="#">Get Started</a></li>
            <li><a href="#">Cara Belanja</a></li>
            <li><a href="#">Pusat Bantuan</a></li>
          </ul>
        </b-col>
        <b-col cols="3">
          <ul style="list-style-type:none;text-align:left;" class="col-12 col-xs-6">
            <li><h6 style="margin-top:35px;">About Us</h6></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">BLOG</a></li>
            <li><a href="#">Terms and Privacy</a></li>
          </ul>
        </b-col>
        <b-col cols="3">
          <h6 class="col-11 text-center" style="margin-top:35px;">Connect with us On</h6>
          <div class="col-12 text-center">
            <!--Facebook-->
            <a href="#" class="pr-4">
                <icon name="facebook"></icon>
            </a>
            <!--Twitter-->
            <a href="#" class="pr-4">
                <icon name="twitter"></icon>
            </a>
            <!--Google +-->
            <a href="#" class="pr-4">
                <icon name="google"></icon>
            </a>
            <!--Linkedin-->
            <a href="#" class="pr-4">
                <icon name="linkedin"></icon>
            </a>
            <!--Instagram-->
            <a href="#" class="pr-4">
                <icon name="instagram"></icon>
            </a>
          </div>
        </b-col>
      </b-row>
    </footer>
    <b-container fluid style="background-color:#181c21;height:60px;">
        <div class="footer-copyright py-3 text-center" style="color:#fefefe;">
        © 2019 Copyright:
        <a href="#" style="color:#2183ce;">
            <strong> Penabuk</strong>
        </a>
        </div>
        <!--/.Copyright -->
      </b-container>
  </b-container>

</template>

<style scoped>
  .container{
    padding-left: 0px;
    padding-right: 0px;
  }
  .container-fluid{
    height:250px;
    max-width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    background-color: #333333;
  }
  h6, li{
    color:#fefefe;
  }

  a {
    color: #2183ce;
  }
</style>
