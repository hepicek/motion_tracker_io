// https://api.themoviedb.org/3/discover/movie?api_key=2737df4078e7e961dbae1994dd5ff332&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1

// import axios from 'axios';
import jsonp from 'jsonp';


const getTopMovies = () => {
    jsonp('https://api.themoviedb.org/3/discover/movie?api_key=2737df4078e7e961dbae1994dd5ff332&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1', null, function (err, data) {
        if (err) {
            return undefined;
        } else {
            // console.log(data);
            return data;
        }
    });
}

export default getTopMovies;