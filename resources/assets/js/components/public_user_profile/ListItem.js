import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";

const ListItem = (props) => {
    const listItem = props.listItem;
    console.log(listItem);
    return (
        <div>
            <img src={AWS_URL + listItem.imdb_img} alt="movie poster" style={{width: '100px'}}/>
            <p>{listItem.name}</p>
            <p>{listItem.user_rating && listItem.user_rating}</p>
        </div>
    );
};

export default ListItem;
