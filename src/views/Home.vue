<template>
  <div class="nowplaying-container">
    <div class="input-form" v-if="showSearch">
      <form @submit="searchMovie">
        <input type="text" placeholder="Search for a movie here" />
        <button>
        <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <h4><span style="color: #ff983d">{{ displayOption }}</span> Movies</h4>
    <div class="select-container">
      <span>Display by: </span>
      <select v-model="displayOption" @change="filterDisplay">
        <option value="Now Playing">Now Playing</option>
        <option value="Top Rated">Top Rated</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Popular">Popular</option>
        <option value="Favourites">Favourites</option>
      </select>
    </div>
    <MovieCard :nowPlaying="nowPlaying" :displayOption="displayOption" />
  </div>
</template>

<script>
import axios from 'axios';
import MovieCard from '../components/MovieCard';

export default {
  name:'Home',
  components:{
    MovieCard,
  },
  props:{showSearch: Boolean},
  created(){
    var getOption = localStorage.getItem('option');
    getOption === null ? this.displayOption === "Top Rated" : this.displayOption = getOption;
    this.filterDisplay();
  },
  data(){
    return{
      nowPlaying: null,
      apiKey: '85a89bafcb43e3738d8f6a5af6e90def',
      displayOption: 'Now Playing',
      favMovieList: null,
      favMovieListData: null,
    }
  },
  methods:{
    getNowPlaying: async function(){
      axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.nowPlaying = res.data.results;
        // console.log(this.nowPlaying);
      })
      .catch(error => {
        console.log(error);
      })
    },
    filterDisplay: function(){
      localStorage.setItem('option', this.displayOption);
      switch(this.displayOption){
          case 'Now Playing':
            this.getNowPlaying();
            break;
          case 'Top Rated':
            this.getTopRated();
            break;
          case 'Upcoming':
            this.getUpcoming();
            break;
          case 'Popular':
            this.getPopular();
            break;
          case 'Favourites':
            this.getFavourites();
          default:
            this.getNowPlaying();
            break;
      }
    },
    getTopRated: function(){
      axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US`)
      .then(res => {
        //this.nowPlaying = res.data.results;
        let { data } = res;
        let { results } = data;
        this.nowPlaying = results;
      })
      .catch(error => {
        console.log(error);
      })
    },
    getUpcoming: function(){
      axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=2`)
      .then(res => {
        this.nowPlaying = res.data.results;
      })
      .catch(error => {
        console.log(error);
      })
    },
    getPopular: function(){
      axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`)
      .then(res => {
        this.nowPlaying = res.data.results;
      })
      .catch(error => {
        console.log(error);
      })
    },
    getFavourites: function(){
      // get movie list
      let movielist = localStorage.getItem('favmovielist');

      if(movielist !== null){
        // remove commas and split into arrays
        movielist = movielist?.split(',').filter(i => i)
        // remove duplicates from array
        this.favMovieList = [...new Set(movielist)]
        const fetchPost = async (movie) => {
          try {
            const data = await axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=${this.apiKey}&language=en-US`)
            return data?.data;
          }
          catch(err){
            console.log(err);
          }
        }
        // initialize array to contain movie data
        let list = [];
        this.favMovieList.forEach(async (movie) => {
          const post = await fetchPost(movie);
          list.push(post);
        })
        setTimeout(() => {
          this.nowPlaying = list;
        }, 100)
      }
      else this.nowPlaying = null;
    },
    searchMovie: function(e){
      e.preventDefault();
      console.log('submit');
    }
  }
}
</script>

<style>
  .nowplaying-container{
    padding: 3% 5%;
    background-color: antiquewhite;
  }

  .nowplaying-container h4{
    text-align: center;
  }

  .select-container{
    text-align: center;
    margin: 1rem 0;
  }

  .select-container select{
    border: 1px solid black;
    border-radius: 4px;
    background: black;
    color: #fff;
    /* width: 120px; */
    padding: 1%;
  }
  /* .input-form input{
    width: 40%;
    margin: 0 auto 1rem;
    display: block;
    border-radius: 10px;
    border: none;
    padding: 3%;
  } */
  form input, form button{
    padding: 0.5rem;
    background: #fff;
    font-size: 1rem;
    border: none;
  }
  .input-form{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 1rem;
  }
</style>