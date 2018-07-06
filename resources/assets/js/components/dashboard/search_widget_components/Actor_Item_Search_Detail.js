import React, {Component} from 'react';
import axios from "axios/index";
import {decodeString} from '../../../helpers/helper';
import { AWS_URL } from '../../../../../../config/js/config';

class ACTOR_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actorMovies: []
        }

    }
    componentWillMount() {
        let actor_id = this.props.actor.imdb_id;
        axios.get(`/searchActorDetails/${actor_id}`)
        .then((res) => {    
            let searchResults = Object.keys(res).map(key => res[key]);
            let actorMovies = searchResults[0][1];
            this.setState({
                actorMovies
            })
        });


    }
    render() {
        
        let movies = this.state.actorMovies.map((movie, index) => {
            let backgroundImage = AWS_URL + movie.imdb_img;
            return (
            <div className="searchItemDetails-main" key={index} style={{display: 'flex'}}>
                <div  
                    className="searchItemDetails-actorMovieImg"
                    style={{
                        backgroundImage: `url(${backgroundImage})`
                    }}
                />
                <div>
                    <p>{decodeString(movie.name)} - {movie.year}</p>
                </div>
            </div>  
            )
        })
        return (
            <div className="searchItemDetails">
                {movies}
            </div>

        )
    }
}

export default ACTOR_ITEM_SEARCH_DETAILS;