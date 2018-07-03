import React, {Component} from 'react';



class CHANGE_PASSWORD extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="changePassword-modal">
                <div className="changePassword-container">
                    <i className="fa fa-times-circle changePwCloseBtn"
                        onClick={this.props.handleChangePwCloseBtnClick}
                    ></i>
                    <p>Old Password
                        <input 
                            type='password' 
                            name='oldPassword'
                            onChange={this.props.updateInputValue}
                        /></p>
                    <p>New Password
                        <input 
                            type='password' 
                            name='newPassword'
                            onChange={this.props.updateInputValue}
                        /></p>
                    <p>Repeat Password
                        <input 
                            type='password' 
                            name='repeatPassword'
                            onChange={this.props.updateInputValue}
                        /></p>
                    <div 
                        className="pwSubmit"
                        onClick={this.props.handlePwSubmit}
                    >Change Password</div>
                    {this.props.pwReturnMessage && <h5 className="changePassword-responseMessage">{this.props.pwReturnMessage}</h5>}
                </div>
            </div>
        )
    }
}

export default CHANGE_PASSWORD;