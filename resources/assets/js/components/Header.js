import React, { Component } from 'react';


const HEADER = (props) => {
        return (
            <div id="navBar">
                <h1>MotionTracker.io</h1>
                <div id="navMenuItems">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>
            </div>
        )

}


export default HEADER;

