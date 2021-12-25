<template>
    <div v-if="actorDetails" class="actordetails-container">
        <div class="actordetails">
            <div class="actordetails-info">
                <img :src="'https://image.tmdb.org/t/p/w500/' + this.actorDetails.profile_path" class="actordetails-poster"/>
                <p class="actordetails-name">{{this.actorDetails.name}}</p>
                <h3>Biography</h3>
                <p class="actordetails-biography">{{this.actorDetails.biography}}</p>
                <h3>Birth details</h3>
                    <div class="birthdetails">
                        <p class="actordetails-dob">{{this.actorDetails.birthday}}</p>
                        <p class="actordetails-birthplace">{{this.actorDetails.place_of_birth}}</p>
                    </div>
                <div class="actordetails-homepage" v-if="this.actorDetails.homepage">
                    <h3>Find out more at:</h3>
                    <a :href=this.actorDetails.homepage target="_blank">{{this.actorDetails.homepage}}</a>
                </div>
                <h3>Movie Credits</h3>
                <div class="actordetails-movies" v-if="this.actorCredits">
                    <div v-for="(movie,index) in this.actorCredits.cast" :key="movie.id">
                        <div v-if="index < 15" class="eachmovie-container">
                            <router-link :to="{name: 'MovieDetails', params: {id:movie.id}}">
                            <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" class="eachmovie-img"/>
                            <i v-else class="far fa-eye-slash fa-8x"></i>
                            <!-- <router-link :to="{name: 'MovieDetails', params: {id:movie.id}}"> -->
                                <p>{{movie.title}}</p>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ActorDetails',
    props:{
        id: String
    },
    data(){
        return{
            apiKey: '85a89bafcb43e3738d8f6a5af6e90def',
            actorDetails: null,
            actorCredits: null,
        }
    },
    created(){
        this.getDetails();
        this.getCredits();
    },
    methods:{
        getDetails: function(){
            axios.get(`https://api.themoviedb.org/3/person/${this.id}?api_key=${this.apiKey}&language=en-US`)
            .then(res => {
                this.actorDetails = res.data;
                console.log(this.actorDetails);
            })
        },
        getCredits: function(){
            axios.get(`https://api.themoviedb.org/3/person/${this.id}/movie_credits?api_key=${this.apiKey}&language=en-US`)
            .then(res => {
                this.actorCredits = res.data;
                console.log(res.data);
            })
        }
    }
}
</script>

<style scoped>
.actordetails-container{
    padding: 5%;
    background-color: antiquewhite;
    width: 100%;
}
.actordetails{
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    background-color: #262525;
    border-radius: 10px;
    padding: 8% 8%;
}
.actordetails h3{
    color: #00c4ff;
}
.actordetails h3:nth-of-type(1){
    margin: 2rem 0 1rem;
}
.actordetails-poster{
    width: 100%;
}
.actordetails-name{
    color: #fff;
    font-weight: bold;
    font-style: italic;
    margin: 1rem 0;
    text-align: center;
}
.actordetails-biography{
    color: #fff;
    line-height: 1.5rem;
    margin: 1rem 0;
}
.birthdetails{
    color: #fff;
    display: flex;
    flex-direction: column;
}
.birthdetails p{
    margin: 1rem 0 0;
}
.actordetails h3:nth-of-type(2), .actordetails h3:nth-of-type(3){
    margin: 2rem 0 0;
}
.actordetails-homepage a{
    text-decoration: none;
    color: #fff;
    cursor: pointer;
}
.actordetails-movies{
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    color: #fff;
}
.eachmovie-container{
    margin: 0.5rem 1rem;
    padding: 0.3rem 0.5rem;
}
.eachmovie-img{
    width: 180px;
    height: 180px;
    object-fit: cover;
    object-position: 50% 25%;
    display: block;
    /* border-radius: 50%; */
    margin: 0 auto 0.5rem;
}
.eachmovie-container p{
    text-align: center;
    margin: 0;
}
.eachmovie-container i{
    margin: 2rem 0 1.77rem;
}
.eachmovie-container a{
    text-decoration: none;
    color: #fff;
}
.eachmovie-container a:hover{
    color: #00c4ff;
}
@media (min-width:1023px){
    .actordetails-poster{
        width: 30%;
        display: block;
        margin: 0 auto;
    }
}
@media (min-width:500px) and (max-width:1023px){
    .actordetails-poster{
        width: 30%;
        display: block;
        margin: 0 auto;
    }
}
</style>