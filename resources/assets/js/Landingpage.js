import React, { Component } from 'react'; 
import jsonp from 'jsonp';
import { TMDB_KEY } from '../../../config/js/config';
import Spinner from "./helpers/Spinner";
import {Card, CardGroup, CardImg, CardBody} from 'reactstrap';

class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topMovies: [],
            loading: true,
        }
    }
    componentDidMount() {
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

            <div 
                className="m-2 px-2 p-1 bg-white d-flex col-md-12 col-sm-12 align-items-center"
                key={movie.id}
                style={{
                    //width: "48%"
                }}
            >
                <img style={{height: "30vmin"}} className="" src={"http://image.tmdb.org/t/p/w185" + movie.poster_path} alt="Card image cap" />
                <CardBody className="card-body p-0 ml-2 align-self-center flex-shrink-1" style={{height: '100%', overflow: 'auto'}}>
                    <h5 className="card-title">{movie.original_title}</h5>
                    <p className="card-text text-justify py-0 my-0" style={{overflowY: "auto", fontWeight: "normal", fontSize: ".8rem", fontFamily: 'Roboto'}}>{movie.overview}</p>
                </CardBody>
            </div>
        ));
        return (
            <div>
                {loading && <Spinner/>}
                <div className='p-2 d-flex flex-wrap w-100'>
                    {!loading && topMovies}
                </div>
            </div>
        );
    }
}

export default Landingpage;