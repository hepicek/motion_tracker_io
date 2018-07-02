import React, {Component} from 'react';
import axios from 'axios';


class CHANGE_PASSWORD extends Component {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            pwReturnMessage: null,
        }
        this.handlePwSubmit = this.handlePwSubmit.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
    }
    handlePwSubmit() {
        axios.post('/userDetails/pw', {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            repeatPassword: this.state.repeatPassword
        })
        .then(res => {
            console.log(res);
            this.setState({
                pwReturnMessage: res.data
            })

        })
    }
    updateInputValue(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {


        return (
            <div className="changePassword-container">
                <p>Old Password
                    <input 
                        type='password' 
                        name='oldPassword'
                        onChange={this.updateInputValue}
                    /></p>
                <p>New Password
                    <input 
                        type='password' 
                        name='newPassword'
                        onChange={this.updateInputValue}
                    /></p>
                <p>Repeat Password
                    <input 
                        type='password' 
                        name='repeatPassword'
                        onChange={this.updateInputValue}
                    /></p>
                <div 
                    className="pwSubmit"
                    onClick={this.handlePwSubmit}
                >Change Password</div>
                {this.state.pwReturnMessage && <p>{this.state.pwReturnMessage}</p>}
            </div>
        )
    }
}

export default CHANGE_PASSWORD;