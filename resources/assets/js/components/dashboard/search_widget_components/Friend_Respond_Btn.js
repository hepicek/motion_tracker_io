import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from 'reactstrap';

class FRIEND_RESPOND_BTN extends Component {
    constructor(props) {
        super(props)
        this.state ={
            dropdownOpen: false
        }
        this.handleFriendBtnClick = this.handleFriendBtnClick.bind(this);
        
    }
    handleFriendBtnClick() {
        this.setState(prevState =>({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {

        return (
            
            <Dropdown 
                isOpen={this.state.dropdownOpen}
                toggle={this.handleFriendBtnClick}
                
            >
                <DropdownToggle caret>
                Respond
                </DropdownToggle>
                    <DropdownMenu
                    className="p-0"
                    style={{
                        minWidth: "unset",
                        cursor: "pointer"                    
                    }}
                    >
                        <DropdownItem 
                            style={{cursor: "pointer"}}
                            onClick={() => {
                                this.props.handleFriendBtnClick(3, this.props.id);
                            }}
                        >
                            Accept
                        </DropdownItem>
                        <DropdownItem divider className="m-0"/> 
                        <DropdownItem 
                            style={{cursor: "pointer"}}
                            onClick={() => {
                                this.props.handleFriendBtnClick(4, this.props.id);
                            }}>Reject</DropdownItem>
                    </DropdownMenu>
            </Dropdown>  
        )
    }
}

export default FRIEND_RESPOND_BTN;