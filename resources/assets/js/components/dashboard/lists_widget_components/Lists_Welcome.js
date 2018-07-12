import React from 'react';

const LISTS_WELCOME = (prop) => {

    return (
        <div 
            className="m-1 p-2"
            style={{border: "2px solid #353B41", color: "#353B41"}}>
            <p>It looks like you're new here.</p>
            <p>Add your first list by clicking on the button above</p>
            <p>You can add movies to the list by searching for them and them over here to the list</p>
            <p>Or you can add something to the list by clicking on the <i className="fa fa-cog" />   icon on each search result</p>
        </div>
    )
}

export default LISTS_WELCOME;