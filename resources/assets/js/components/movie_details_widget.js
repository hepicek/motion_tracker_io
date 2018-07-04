import React, { Component } from 'react';
import {AWS_URL} from '../../../../config/js/config';
import Rating from "react-rating";
import axios from "axios/index";

class MOVIE_DETAILS_WIDGET extends Component {
    constructor(props) {
        super(props);
        this.style = {
            position: "absolute",
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid black",
            color: "black",
            boxShadow: "3px 3px 8px 0 black",
            borderRadius: "10px",
            width: "450px",
            zIndex: "1"
        };
        this.state = {
            loading: true
        };
        this.goldStar = {
            color: '#E4BB24'
        };
        this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    componentDidMount() {
        let movieItemImdbId = this.props.imdb_id;
        axios.get(`/searchMovieDetails/${movieItemImdbId}`)
            .then((res) => {
                let searchResults = Object.keys(res).map(key => res[key]);
                this.setState({
                    movieDetails: {
                        title: searchResults[0][2].name,
                        year: searchResults[0][2].year,
                        mt_rating: searchResults[0][2].mt_user_rating,
                        imdb_rating: searchResults[0][2].rating,
                        image: searchResults[0][2].imdb_img,
                        tagline: searchResults[0][2].tagline,
                        runTime: searchResults[0][2].runTime,
                        cast: searchResults[0][0],
                        directors: searchResults[0][1]
                    }
                })        
            })
            .then(() => {

                this.setState({ loading: false })
            })
    }
    handleRatingChange (value) {
        axios.post('movieRating', [this.props.imdb_id, value])
            .then((res) => {
              //  this.setState({rating: res.data[0].mt_user_rating});
            });
    };

    render() {
        let poster = !this.state.loading ? AWS_URL + this.state.movieDetails.image : undefined;
        let cast = !this.state.loading && this.state.movieDetails.cast.map(actor => {
            let actorImage = AWS_URL + actor.person_img;
            return (
                <div 
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <div 
                        style={{
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundImage: `url(${actorImage})`,
                            height: "100px",
                            width: "70px",
                            marginRight: "10px",
                            backgroundColor: "gray"
                        }}
                    />
                    <p>{actor.fullname}</p>
                </div>
            )
        })
        return (
            <div 
                className="movieDetailsWidget"
                style={this.style}    
            >
            {this.state.loading && <p>Loading...</p>}
            {!this.state.loading && 
                <div>
                    <div
                        style={{
                            display: "flex"
                        }}
                    >
                        <div 
                            style={{
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundImage: `url(${poster})`,
                                height: "150px",
                                width: "100px",
                                marginRight: "10px",
                                backgroundColor: "gray",
                            }}
                        />
                        <div
                            style={{
                                width: "60%"                            
                            }}
                        >
                            <h3>{this.state.movieDetails.title}</h3>
                            <p>{this.state.movieDetails.year}</p>
                            <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol={"fa fa-star fa-2x"}
                                initialRating={this.state.movieDetails.mt_rating}
                                fractions={2}
                                onChange={this.handleRatingChange}
                                value={this.state.movieDetails.mt_rating}
                                style={this.goldStar}
                            />
                            <p>{this.state.movieDetails.tagline}</p>
                        </div>
                    </div>
                    <div 
                        style={{
                            display: "flex",
                            width: "80%",
                            justifyContent: "space-around",
                            margin: "10px auto 0 auto",
                        }}>
                    {cast}
                    </div>
                </div>}
            </div>
        )
    }

}

export default MOVIE_DETAILS_WIDGET;