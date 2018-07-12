import React, {Component} from 'react';
import UserActivity from "./UserActivity";
import {Col} from 'reactstrap';

class RecentUserActivities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newsFeedOffset: 0,
        }
    }
    render() {
        let {props} = this;
        let recentActivities = !props.recentActivity ? 
            <p className="p-3">No recent activity from this user</p> : 
            props.recentActivity.reverse()
                .slice(this.state.newsFeedOffset, 5 + this.state.newsFeedOffset)
                .map((activity, index) => {
                return (
                    <UserActivity key={'act-' + index} activity={activity}/>
                )
            });
        return (
            <Col 
                md="12" lg="4"
                
            >
            {this.props.loading && <div className="h-100 d-flex flex-column justify-content-between">
                <div>
                    {props.recentActivity && <h4>Recent Activity</h4>}
                    <div className="recentUserActivities-activitiesList w-100">

                        {recentActivities}
                        
                    </div>
                </div>
                    <div className="w-25 d-flex justify-content-between align-self-center my-1">
                    {(props.recentActivity.length > 5) &&
                        <i 
                            className="fa fa-angle-left" 
                            style={{
                                fontSize: "1.5rem", 
                                cursor: !!this.state.newsFeedOffset && "pointer",
                                color: !!this.state.newsFeedOffset ? "#212529" :"#f0f0f0"
                            }} 
                            onClick={() => {

                                !!this.state.newsFeedOffset && this.setState(prevState =>({newsFeedOffset: prevState.newsFeedOffset - 5}))}
                            }
                            
                        />}
                        {(props.recentActivity.length > 5) &&
                            <i 
                                className="fa fa-angle-right" 
                                style={{
                                    fontSize: "1.5rem",
                                    cursor: this.state.newsFeedOffset + 5 < props.recentActivity.length && "pointer",
                                    color: this.state.newsFeedOffset + 5 < props.recentActivity.length ? "#212529" :"#f0f0f0"
                                }} 
                                onClick={() => {
                                    this.state.newsFeedOffset + 5 < props.recentActivity.length && this.setState(prevState =>({newsFeedOffset: prevState.newsFeedOffset + 5}))}
                                }
                            />
                        }
                    </div>
                </div>}
            </Col>
        )
    }
};

export default RecentUserActivities;