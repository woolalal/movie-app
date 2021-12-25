<template>
    <div>
    <section class="search-section">
        <div class="searchmovie-container">
            <p>Millions of amazing movies for you to discover. Search a movie to find out more.</p>
            <form @submit="movieSearch">
                <input class="searchmovie-input" type="text" v-model="searchmovie" placeholder="Enter a movie name..."/>
                <input type="submit" class="searchmovie-submit" value="Search">
            </form>
        </div>
        <div v-if="this.nowPlaying" class="nowplaying-container">
            <h4>{{showText}}</h4>
            <MovieCard :nowPlaying="nowPlaying"/>
        </div>
    </section>
    </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard';
export default {
    data(){
        return{
            searchmovie: null,
            apiKey: '85a89bafcb43e3738d8f6a5af6e90def',
            nowPlaying: null,
            finalSearch: '',
        }
    },
    components:{
        MovieCard
    },
    methods:{
        movieSearch: async function(evt){
            evt.preventDefault();
            if(this.searchmovie !== ""){
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${this.searchmovie}`)
                .then(res => {
                    let {results} = res.data;
                    this.nowPlaying = results;
                    this.finalSearch = this.searchmovie;
                })
            }
            else alert("fill in smth")
        },
    },
    computed:{
        showText(){
            return "Showing search results for: " + this.finalSearch;
        }
    }
}
</script>

<style scoped>
    .search-section{
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
    }
    .searchmovie-container{
        background-image: linear-gradient(180deg, rgba(0,0,0,.5333333333333333) 33%,hsla(0,0%,100%,.26666666666666666)), url('../assets/moviesbackground.jpeg');
        width: 100%;
        background-size: cover;
        background-position: bottom;
        min-height: 400px;
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    div.searchmovie-container > p {
        color: #fff;
        font-size: 1.5rem;
        font-weight: 700;
        padding: 1rem;
        margin: 0 auto 0.5rem;
    }
    .searchmovie-input{
        outline: none;
        border: none;
        border-radius: 7px;
        padding: 0.5rem 0.7rem;
    }
    .searchmovie-submit{
        padding: 0.5rem;
        margin: 0.5rem;
        border-radius: 7px;
        outline: none;
        border: none;
        cursor: pointer;
        background-color: #ff983d;
        color: #fff;
    }
</style>