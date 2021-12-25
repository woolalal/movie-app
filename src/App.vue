<template>
  <Navbar @show-form="toggleForm"/>
  <router-view :showSearch="showSearch"/>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components:{
    Navbar,
    Footer,
  },
  methods: {
    toggleForm: function(){
      this.showSearch = !this.showSearch;
      console.log(this.showSearch);
    }
  },
  data(){
    return{
      showSearch: false
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700&family=Montserrat:wght@300;400;500;700&family=Roboto:wght@300;400&display=swap');

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
</style>
