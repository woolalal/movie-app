<template>
    <div className='footer-container'>
            <router-link :to="{name: 'Home'}">
            <img src="../assets/popcorn.png" class='footer-logo'>
            </router-link>
            <!-- <a href=""><i class="fab fa-twitter footer-icon"></i></a>
            <a href=""><i class="fab fa-facebook footer-icon"></i></a> -->
            <a href=""><i class="fab fa-instagram footer-icon"></i></a>
            <a href=""><i class="fas fa-envelope footer-icon"></i></a>
            <p class='footer-text'>© Copyright 2021 Popcorn</p>
        </div>
</template>

<script>
export default{
    name: 'Footer',

}
</script>

<style scoped>
.footer-container{
  padding: 3%;
  background-color: black;
  text-align: center;
}
.footer-logo{
  width: 12%;
  display: block;
  margin: auto;
}
.footer-icon{
  color: white;
  margin: 20px;
}
.footer-text{
  color: #fff;
}
@media (min-width: 1024px){
  .footer-logo{
    width: 4%;
  }
}
@media (min-width: 500px) and (max-width:1023px){
  .footer-logo{
    width: 4%;
  }
}
</style>