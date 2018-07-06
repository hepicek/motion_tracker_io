import React, { Component } from 'react';
import LIST_BTN_OPTIONS from './List_Menu_Btn_Options';
import {Popover} from 'reactstrap';

class LIST_MENU_BTN extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popoverOpen: false
        }
        this.toggle = this.toggle.bind(this);       
    }
    toggle() {
        this.setState(prevState => ({
            popoverOpen: !prevState.popoverOpen
        }))
    }

    render() {
        let props = this.props;
        return (
            <div className="listMenuBtn">
                <i 
                    className="fa fa-cog"
                    onClick={this.toggle}
                    id={"listMenuBtn-" + props.listId}
                />
                <Popover 
                    style={{cursor: "pointer"}}
                    placement="left"
                    isOpen={this.state.popoverOpen}
                    toggle={this.toggle}
                    target={"listMenuBtn-" + props.listId}
                    className="friendOptions"
                >
                    <LIST_BTN_OPTIONS 
                        listId = {props.listId}
                        handleRenameListClick={props.handleRenameListClick}
                        handleListDeleteClick={props.handleListDeleteClick}
                        handleClickOutside={this.handleClickOutside}
                        open={this.state.open}
                    />
                </Popover>
            </div>

        )
    }
}


export default LIST_MENU_BTN;