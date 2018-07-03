import React, { Component } from 'react'; 
import jsonp from 'jsonp';
import { TMDB_KEY } from '../../../config/js/config';
import Spinner from "./helpers/Spinner";

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topMovies: [],
            loading: true,
        }
    }
    componentWillMount() {
        jsonp(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`, null, (err, data) => {
            if (err) {
                return undefined;
            } else {
                this.setState({
                    topMovies: data.results,
                    loading: false,
                });
            }
        });

    }   
    render() {
        const loading =this.state.loading;
        let topMovies = this.state.topMovies.map(movie => (

            <div className="card" key={movie.id} style={{padding: '10px', width: '48%', height: '20rem', alignItems: 'center', flexDirection: 'row', margin: '2px'}} >
                <img style={{width: '13rem'}}   className="card-img-top" src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Card image cap" />
                <div className="card-body" style={{height: '100%', overflow: 'auto'}}>
                    <h5 className="card-title">{movie.original_title}</h5>
                    <p className="card-text">{movie.overview}</p>
                </div>
            </div>
        ));
        return (
            <div className="container">
                {loading && <div>Loading...</div>}
                {loading && <Spinner/>}
                <div className='topMovies'>
                    {topMovies && topMovies}
                </div>
            </div>
        );
    }
}

export default Landingpage;