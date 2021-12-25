<template>
    <div v-if="nowPlaying" class="movie-grid">
        <div v-for="(movie, index) in nowPlaying" :key="movie.id">
            <div v-if="index < 10" class="moviecard-container">
                <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="movie-poster">
                <p class="movie-title">{{ movie.title }}</p>
                <div class="poster-overlay">
                <p class="movie-title" style="color: #ff983d">{{ movie.title }}</p>
                <p class="overlay-releasedate">Release Date:<br>{{movie.release_date}}</p>
                <p>{{ movie.vote_average }} <i class="fas fa-star"></i></p>
                <p class="overlay-overview" v-if="(movie.overview).length < 300">{{ movie.overview }}</p>
                <p v-else>{{ (movie.overview).substring(0,250)+"..." }}</p>
                <router-link :to="{name: 'MovieDetails', params: {id:movie.id}}">
                <button class="moreinfo-btn">More info</button>
                </router-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <img src="../assets/spinner.gif" class="loading-spinner">
    </div>
</template>

<script>
export default {
    name: 'MovieCard',
    props:{
        nowPlaying: Array,
    },
}
</script>

<style scoped>
    @media (max-width: 500px){

    }

    .movie-poster{
        width: 100%;
    }

    .moviecard-container{
        background-color: rgb(38, 37, 37);
        border-radius: 12px;
        margin: 1.5rem auto;
        color: #FFF;
        box-shadow: 0 2px 4px rgb(0 0 0 / 40%), 0 7px 13px -3px rgb(0 0 0 / 30%), inset 0 -3px 0 rgb(0 0 0 / 20%);
        padding: 8%;
        width: 100%;
        height: 100%;
        position: relative;
    }
    
    .loading-spinner{
        display: block;
        width: 20%;
        margin: auto;
    }

    .movie-title{
        font-weight: bold;
        margin: 1rem 0 0rem;
    }

    .poster-overlay{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: .5s ease;
        background-color: rgb(0, 0, 0,.75);
        color: white;
        text-align: center;
        backdrop-filter: blur(3px);
        padding: 5%;
    }

    .moviecard-container:hover .poster-overlay{
        opacity: 1;
    }

    .poster-overlay p{
        margin: 0.5rem;
        font-size: small;
    }

    .moviecard-container .moreinfo-btn{
        padding: 3.5%;
        border-radius: 25px;
        border: 1px solid #ff983d;
        color: #ff983d;
        background: none;
        cursor: pointer;
    }
    @media (min-width: 1024px) and (max-width: 1400px){
        .movie-grid{
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 1rem;
        }
    }
    @media (min-width: 500px) and (max-width:1023px){
        .movie-grid{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 1rem;
        }
    }
    @media (min-width: 1399px){
        .movie-grid{
        display: grid;
        grid-template-columns: repeat(5,1fr);
        gap: 1rem;
        }
    }
</style>