import React from 'react';
import USER_PHOTO from './user_photo';
import { Form, Button, Label, Input, Col, Row } from 'reactstrap';

const USER_DETAILS_FORM = (props) => {
    let userDetails = props.userDetails;
    return (    
        <div>
            <USER_PHOTO 
                handleFileSelected={props.handleFileSelected} 
                handleFileSubmit={props.handleFileSubmit}
                handleDeletePhoto={props.handleDeletePhoto}
                img_url={props.userDetails.img_url}
                file={props.file}
            />
            <Form name="userProfileForm" method="post" action={"/userDetails/" + userDetails.id} encType="multipart/form-data">
                <Row className="d-flex justify-content-between my-2" >
                        <Col sm="4">
                            <Label for="first_name" >First Name:</Label>
                        </Col>
                        <Col sm="8">
                            <Input 
                                name="first_name"
                                id="first_name"
                                value={userDetails.first_name} 
                                onChange={props.handleChange}
                            />
                        </Col>
                </Row>
                <Row className="d-flex justify-content-between my-2" >
                        <Col sm="4">
                            <Label for="last_name" >Last Name:</Label>
                        </Col>
                        <Col sm="8">
                        <Input 
                            id="last_name" 
                            name="last_name" 
                            value={userDetails.last_name} 
                            onChange={props.handleChange}
                        />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between my-2" >
                        <Col sm="4">
                            <Label for="common_name" >Common Name:</Label>
                        </Col>
                        <Col sm="8">
                        <Input 
                            id="common_name" 
                            name="common_name" 
                            value={userDetails.common_name} 
                            onChange={props.handleChange}
                        />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-between my-2" >
                        <Col sm="4">
                            <Label for="email" >Email:</Label>
                        </Col>
                        <Col sm="8">
                        <Input 
                            id="email" 
                            name="email" 
                            value={userDetails.email} 
                            onChange={props.handleChange}
                            disabled
                        />

                    </Col>
                </Row>
                <Row className="d-flex justify-content-between my-2" >
                        <Col sm="4">
                            <Label for="dob" >Date of Birth:</Label>
                        </Col>
                        <Col sm="8">
                        <Input 
                            id="dob" 
                            name="dob" 
                            type="date"
                            value={userDetails.dob} 
                            onChange={props.handleChange}
                        />

                    </Col>
                </Row>
                <Row className="d-flex justify-content-center my-2">
                <Button 
                    type="submit" 
                    onClick={props.handleSubmit}
                >Save Changes
                </Button>
                </Row>
            </Form>
        </div>
    )
}

export default USER_DETAILS_FORM;

//For later use when removing save button and
//{/*<i className="fa fa-edit"></i>*/}