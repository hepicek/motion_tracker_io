import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import Landingpage from './Landingpage';
import User_Profile from './User_Profile';
import Public_User_Profile from './Public_User_Profile';

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */



if (document.getElementById('dashboard')) {
    ReactDOM.render(<Dashboard/>, document.getElementById('dashboard'));
} else
if (document.getElementById('landingPage')) {
    ReactDOM.render(<Landingpage />, document.getElementById('landingPage'));
} else
if (document.getElementById('userprofile')) {
    ReactDOM.render(<User_Profile />, document.getElementById('userprofile'));
}
if (document.getElementById('userpublicprofile')) {
    ReactDOM.render(<Public_User_Profile />, document.getElementById('userpublicprofile'));
}