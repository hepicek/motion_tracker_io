import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HEADER from '../components/Header';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmitBtnClick = this.handleSubmitBtnClick.bind(this);
    }

    handleSubmitBtnClick() {
        console.log("clicked");
        let userEmail = document.querySelector("#emailInput").value;
        let userPassword = document.querySelector("#passwordInput").value;

        let data = new FormData();
        data.append("email", userEmail);
        data.append("password", userPassword);

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);
            const token = response.success ? response.success.token : undefined;
            if(token) {window.location.href = "/dashboard";}
        }
        });

        xhr.open("POST", "/api/userLogin");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("Postman-Token", "4c51b8d7-e9be-4fa1-8bb7-36f7873d3df7");

        xhr.send(data);
    }
    render() {
        return (
            <div id="loginPage" className="container">
            <HEADER />
                <div className="contentWrapper">
                    <div id="loginForm">
                        <div className="formRow">
                            <h2 className="formLabel">
                                Email:
                            </h2>
                            <input id="emailInput" type="text" />
                        </div>
                        <div className="formRow">
                            <h2 className="formLabel">
                                Password:
                            </h2>
                            <input id="passwordInput" type="password" />
                        </div>
                        <div 
                            id="loginSubmitBtn"
                            onClick={this.handleSubmitBtnClick}>
                            Submit
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

    if (document.getElementById('login')) {
        ReactDOM.render(<Login />, document.getElementById('login'));
    }