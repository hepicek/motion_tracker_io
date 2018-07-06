import React, {Component} from 'react';
// import SEARCH_CATEGORIES from './search_widget_components/Search_Categories';
import SEARCH_RESULTS_MOVIES from './search_widget_components/Search_Results_Movies';
import SEARCH_RESULTS_ACTORS from './search_widget_components/Search_Results_Actors';
import SEARCH_RESULTS_USERS from './search_widget_components/Search_Results_Users';
// import SEARCH_RESULTS_ITEM_WIDGET_MOVIES from './search_widget_components/Search_Results_Item_Widget_Movies';
// import SEARCH_RESULTS_ITEM_WIDGET_ACTORS from './search_widget_components/Search_Results_Item_Widget_Actors';
// import SEARCH_RESULTS_ITEM_WIDGET_USERS from './search_widget_components/Search_Results_Item_Widget_Users';
import classnames from 'classnames';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';


class SEARCH_MOVIES_WIDGET extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: '1'
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        let {props} = this;
        return (
            <div className="searchMoviesContainer w-100">
                <Nav tabs
                    style={{cursor: "default"}}    
                >
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                    >
                        Movies
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                    >
                        Actors
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                    >
                        Users
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <SEARCH_RESULTS_MOVIES results={props.searchResults.movies}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <SEARCH_RESULTS_ACTORS results={props.searchResults.actors}/>
                    </TabPane>
                    <TabPane tabId="3">
                        <SEARCH_RESULTS_USERS results={props.searchResults.users}/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
};


export default SEARCH_MOVIES_WIDGET;


// <SEARCH_CATEGORIES 
// handleCategoryClick={props.handleCategoryClick}
// searchType={props.searchType}
// />