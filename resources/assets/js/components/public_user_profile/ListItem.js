import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";
import {decodeString} from "../../helpers/helper";

const ListItem = (props) => {
    const listItem = props.listItem;
    return (
        <div>
           {listItem.imdb_img && <img src={AWS_URL + listItem.imdb_img} alt="movie poster" style={{width: '100px'}}/>}
            <p>{decodeString(listItem.name)}</p>
            <p>{listItem.user_rating && listItem.user_rating}</p>
        </div>
    );
};

export default ListItem;
