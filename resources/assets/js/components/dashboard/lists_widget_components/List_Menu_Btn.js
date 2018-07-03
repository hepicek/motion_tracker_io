import React, { Component } from 'react';
import LIST_BTN_OPTIONS from './List_Menu_Btn_Options';

class LIST_MENU_BTN extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.handleListMenuBtnClick = this.handleListMenuBtnClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
       
    }
    handleListMenuBtnClick(e) {
        let open = this.state.open ? false : true;
        this.setState({
            open
        });
    }
    handleClickOutside(e) {
        if (!e.target.classList.contains("listMenuBtnArea")) {
          this.setState({
              open: false
          })
        }
    }
    render() {
        let props = this.props
        return (
            <div className="listMenuBtn">
                <i 
                    className="fa fa-cog"
                    onClick={this.handleListMenuBtnClick}
                />
                {this.state.open &&
                    <LIST_BTN_OPTIONS 
                        listId = {props.listId}
                        handleRenameListClick={props.handleRenameListClick}
                        handleListDeleteClick={props.handleListDeleteClick}
                        handleClickOutside={this.handleClickOutside}
                        open={this.state.open}
                    />
                }
            </div>

        )

}
}


export default LIST_MENU_BTN;