import React, {Component} from 'react';
import axios from "axios/index";
import {decodeString} from '../../../helpers/helper';

class USER_ITEM_SEARCH_DETAILS extends Component {
    constructor(props) {
        super(props)

    }
    // componentWillMount() {
    //     let actor_id = this.props.actor.imdb_id;
    //     axios.get(`/searchActorDetails/${actor_id}`)
    //     .then((res) => {    
    //         let searchResults = Object.keys(res).map(key => res[key]);
    //         let actorMovies = searchResults[0][1];
    //         this.setState({
    //             actorMovies
    //         })
    //     });


    // }
    render() {
        console.log(this.props);
        
        
        return (
            <div className="searchItemDetails">
               
            </div>

        )
    }
}

export default USER_ITEM_SEARCH_DETAILS;