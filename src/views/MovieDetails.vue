<template>
    <div class="moviedetails-container" v-if="this.details && this.credits">
        <div class="moviedetails">
            <div class="moviedetails-info">
                <img :src="'https://image.tmdb.org/t/p/w500/' + this.details.poster_path" class="moviedetails-poster"/>
                <h2 class="moviedetails-title">{{this.details.title}}</h2>
                <div class="moviedetails-dates">
                    <p>{{ this.details.release_date }}</p>
                    <p>{{ runtime }}</p>
                </div>
                <h3>Overview</h3>
                <p class="moviedetails-overview">{{this.details.overview}}</p>
                <div class="moviedetails-otherinformation">
                    <h3>Genre</h3>
                    <div class="genre-list">
                        <p v-for="genre in this.details.genres" :key="genre.id">
                        {{ genre.name}}
                        </p>
                    </div>
                    <p v-if="this.details.tagline" class="moviedetails-tagline">{{ this.details.tagline}}</p>
                    <h3>Cast</h3>
                    <div class="cast-container">
                        <div v-for="(cast, index) in this.credits.cast" :key="cast.id">
                            <div v-if="index < 10" class="eachcast-container">
                                <router-link :to="{name: 'ActorDetails', params: {id:cast.id}}">
                                <img v-if="cast.profile_path" :src="'https://image.tmdb.org/t/p/w500/' + cast.profile_path" class="cast-img"/>
                                <i class="fas fa-user-alt-slash fa-8x" v-else></i>
                                <!-- <router-link :to="{name: 'ActorDetails', params: {id:cast.id}}"> -->
                                <p>{{cast.name}}</p>
                                </router-link>
                                <p>{{cast.character}}</p>
                            </div>
                        </div>
                    </div>
                    <h3 style="margin-top:2rem">Video</h3>
                    <div v-if="this.trailer" class="moviedetails-video">
                        <div v-if="this.trailer.results.length">
                            <iframe v-if="this.trailer.results.length" :src="'https://www.youtube-nocookie.com/embed/' + this.trailer.results[0].key"></iframe>
                            <p>{{this.trailer.results[0].name}}</p>
                        </div>
                        <i v-else class="fas fa-video-slash fa-6x"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:'MovieDetails',
    props: {
        id: '',
    },
    data(){
        return{
            apiKey: '85a89bafcb43e3738d8f6a5af6e90def',
            details: null,
            credits: null,
            trailer: null,
        }
    },
    methods:{
        getDetails: function(){
            axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.apiKey}&language=en-US`)
            .then(res => {
                this.details = res.data;
                //console.log(this.details);
            })
        },
        getCredits: function(){
            axios.get(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=${this.apiKey}&language=en-US`)
            .then(res => {
                this.credits = res.data;
                //console.log(this.credits);
            })
        },
        getTrailer: function(){
            axios.get(`https://api.themoviedb.org/3/movie/${this.id}/videos?api_key=${this.apiKey}&language=en-US&append_to_response=videos`)
            .then(res => {
                this.trailer = res.data;
                console.log(this.trailer);
                console.log(this.trailer.results.length);
            })
        }
    },
    created(){
        this.getDetails();
        this.getCredits();
        this.getTrailer();
    },
    computed:{
        runtime: function(){
            let hours = Math.floor((this.details.runtime) / 60);
            let minutes = (this.details.runtime) % 60;
            let format = hours + ' hr ' + minutes + ' min';
            return format;
        }
    },
}
</script>

<style>
.moviedetails-container{
    padding: 5%;
    background-color: antiquewhite;
    width: 100%;
}
.moviedetails{
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    background-color: #262525;
    border-radius: 10px;
    padding: 8% 8%;
}
.moviedetails-poster {
    width: 100%;
}
.moviedetails-title{
    font-weight: bold;
    color: #FFF;
    margin: 1rem 0;
}
.moviedetails-dates{
    color: #fff;
    display: flex;
    flex-direction: row;
}
.moviedetails-dates p:nth-of-type(2){
    margin: 1.5rem;
}
.moviedetails-dates p:first-child{
    margin-top: 1.5rem;
}
.moviedetails h3{
    color: #00c4ff;
}
.moviedetails-overview{
    color: #fff;
    margin: 1rem 0 2rem;
    line-height: 1.5rem;
}
.genre-list{
    color: #fff;
    display: flex;
    justify-content: space-around;
    margin: 1rem 0 2rem;
}
.cast-container{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    color: #fff;
}
.eachcast-container{
    margin: 0.5rem 1rem;
    padding: 0.3rem 0.5rem;
}
.eachcast-container a{
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}
.eachcast-container a:hover{
    color: #00c4ff;
    transition: 0.5s ease;
}
.cast-img{
    width: 180px;
    height: 180px;
    object-fit: cover;
    object-position: 50% 25%;
    display: block;
    border-radius: 50%;
    margin: 0 auto 0.5rem;
}
.cast-container p{
    text-align: center;
    margin: 0;
}
.cast-container i{
    margin: 2rem 0 1.77rem;
}
.moviedetails-tagline{
    color: #fff;
    text-align: center;
    font-style: italic;
    margin: 0 0 2rem;
}
.moviedetails-video{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 1rem auto;
}
.moviedetails-video p{
    color: #fff;
    margin: 1rem 0;
    font-style: italic;
}
.moviedetails-video i{
    color: #FFF;
    margin: 1rem 0;
}
@media (min-width:500px){
    .moviedetails-poster{
        display: block;
        width: 40%;
        margin: 0 auto;
    }
    .moviedetails-video iframe{
        width: 100%;
        height: 300px;
    }
}
/* @media (min-width: 500px) and (max-width:1023px){
    .moviedetails-poster{
        display: block;
        width: 40%;
        margin: 0 auto;
    }
    .moviedetails-video iframe{
        width: 100%;
        height: 300px;
    }
} */
</style>