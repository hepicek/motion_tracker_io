import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";

const TopMovie = (props) => (
    <div className="my-1">
        <img src={AWS_URL + props.data.imdb_img} className="img-fluid" style={{maxWidth: '150px'}} alt=""/>
    </div>
);

export default TopMovie;
