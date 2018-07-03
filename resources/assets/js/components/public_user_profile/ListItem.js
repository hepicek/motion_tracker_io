import React from 'react';
import {AWS_URL} from "../../../../../config/js/config";

const ListItem = (props) => {
    const listItem = props.listItem;
    const background = AWS_URL + listItem.imdb_img;
    return (
        <div className="userPublicProfileListItem">
            <div className="ListItem_movieImage"
                 style={{backgroundImage: `url(${background})`}}/>
            <p className="publicUserListItemName">{listItem.name}</p>
            <p className="publicUserListItemRating">Rating: {listItem.user_rating && listItem.user_rating}</p>
        </div>
    );
};

export default ListItem;
