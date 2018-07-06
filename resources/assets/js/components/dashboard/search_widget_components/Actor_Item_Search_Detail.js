import React, {Component} from 'react';
import ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD from './Actor_Item_Search_Detail_Movie_Card';
import axios from "axios/index";

class ACTOR_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props)
        this.state = {
            actorMovies: [],
            loading: true
        }

    }
    componentDidMount() {
        let actor_id = this.props.actor.imdb_id;
        axios.get(`/searchActorDetails/${actor_id}`)
        .then((res) => {    
            let searchResults = Object.keys(res).map(key => res[key]);
            let actorMovies = searchResults[0][1];
            this.setState({
                actorMovies,
                loading: false
            })
        });


    }
    render() {
        
        let movies = this.state.actorMovies.map(movie => {
            return (
                <ACTOR_ITEM_SEARCH_DETAIL_MOVIE_CARD 
                    key={"actorSearchMovieCard-" + movie.imdb_id}
                    movie={movie} 
                />
            )
        })
        return (
            <div className="bg-white p-2 d-flex flex-wrap">
                {this.state.loading && <p>loading...</p>}
                {this.state.loading || movies}
            </div>

        )
    }
}

export default ACTOR_ITEM_SEARCH_DETAILS;