<template>
    <div class="navbar-container">
        <img src="../assets/popcorn.png" alt="app-logo">
        <!-- <router-link :to="{name: 'Home'}"> -->
        <router-link to="/">
            <span>Pop</span><span>corn</span>
        </router-link>
        <router-link :to="{name: 'SearchMovie', params: {showForm:true}}">
        <i class="fas fa-search"></i>
        </router-link>
    </div>
    <hr>
</template>

<script>
export default {
    name: 'Navbar',
    methods:{
        toggleForm: function(){
            this.$emit('show-form');
        }
    },
    emits: ['show-form']
}
</script>

<style scoped>
    img{
        width: 10%;
    }
    span{
        font-family: 'Montserrat', sans-serif;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .navbar-container{
        padding: 3%;
        background-color: antiquewhite;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .navbar-container span:first-of-type{
        color: #00c4ff;
    }
    .navbar-container span:nth-of-type(2){
        color: #ff983d;
    }
    .navbar-container a{
        text-decoration: none;
    }
    /* .navbar-container i{
        position: absolute;
        right: 20px;
        top: 23px;
    } */
    .navbar-container i{
        margin-left: auto;
        cursor: pointer;
    }
    .navbar-container a:nth-of-type(2){
        color: black;
        margin-left: auto;
    }
    @media (min-width:500px){
        img{
            width: 5%;
        }
    }
</style>