import React from 'react';
import { AWS_URL } from '../../../../../config/js/config';
import {Card, CardImg, CardBody, Button, Row, Col} from 'reactstrap';
const USER_PHOTO = (props) => {
    if (props.file.name == "") {
        var file = false;
    } else {
        var file = true;
    }
    return (
        <Card>
            <CardImg src={AWS_URL + props.img_url} />
            <CardBody>
                <input
                    name="user_photo"
                    type="file"
                    onChange={props.handleFileSelected}
                    ref={fileInput => this.fileInput = fileInput}
                    hidden
                />
                <Row className="d-flex justify-content-around">

                        <Button
                            size="sm"
                            onClick={() => this.fileInput.click()}
                        >
                            Choose file
                        </Button>

                        {file && <p>{props.file.name} - </p>}
                        <Button
                        size="sm"
                            onClick={props.handleFileSubmit}
                        >
                            Upload file
                        </Button>

                        <Button
                            size="sm"
                            color="danger"
                            onClick={props.handleDeletePhoto}
                        >
                            Delete Photo
                        </Button>

                </Row>
            </CardBody>
        </Card>
    )
}

export default USER_PHOTO;