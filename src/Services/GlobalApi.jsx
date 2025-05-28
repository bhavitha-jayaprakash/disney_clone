import axios from "axios";

const movieBaseUrl="https://api.themoviedb.org/3"
const api_key=''

const movieByGenreBaseURL='https://api.themoviedb.org/3/discover/movie?api_key=';

//https://api.themoviedb.org/3/trending/all/day?api_key=b860ca2d33c718271a8fecef78256e49
const getTrendingVideos=axios.get(movieBaseUrl+
    "/trending/all/day?api_key="+api_key);
    const getMovieByGenreId=(id)=>
    axios.get(movieByGenreBaseURL+"&with_genres="+id)

export default{
    getTrendingVideos,
    getMovieByGenreId
}
