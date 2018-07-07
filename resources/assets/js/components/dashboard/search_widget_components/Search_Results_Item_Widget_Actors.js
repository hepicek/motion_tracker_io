import React, {Component} from 'react';
import {decodeString} from '../../../helpers/helper'
import ACTOR_ITEM_SEARCH_DETAILS from './Actor_Item_Search_Detail.js';
import { AWS_URL } from '../../../../../../config/js/config';
import {Collapse} from 'reactstrap';

class SEARCH_RESULTS_ITEM_WIDGET_ACTORS extends Component {
    constructor(props) {
        super(props);
        this.handleCaretClick = this.handleCaretClick.bind(this);
        this.state = {
            caret: 'down',
            collapse: false,
            actorMovies: [],
            loading: true
        }
    }

    getActorDetails() {
        let actor_id = this.props.searchResultsItem.imdb_id;
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
    handleCaretClick() {
        this.setState(prevState => ({
            caret: this.state.caret === 'down' ? 'up' : 'down',
            collapse: !prevState.collapse
        }));
    }
    componentDidMount() {
        this.getActorDetails();
    }

    render() {
        

        let image_src = (this.props.searchResultsItem.person_img == "" || !this.props.searchResultsItem.person_img) ? 'img/person_img/person_placeholder.png' : this.props.searchResultsItem.person_img;
        return (
            <div>
                <div className='d-flex align-items-center bg-white my-2 w-100 p-2' 
                    onClick={this.handleCaretClick}
                >   
                <i className={"mr-2 fa fa-caret-" + this.state.caret} />
                <div className="actorSearchImage mr-4" style={{backgroundImage: `url(${AWS_URL + image_src})`}} />
                    <p className="m-0">{decodeString(this.props.searchResultsItem.fullname)}</p>
                </div>
                <Collapse isOpen={this.state.collapse}> 
                    <ACTOR_ITEM_SEARCH_DETAILS actorMovies={this.state.actorMovies} loading={this.state.loading} />
                </Collapse>
            </div>
        )
    }

}

export default SEARCH_RESULTS_ITEM_WIDGET_ACTORS;