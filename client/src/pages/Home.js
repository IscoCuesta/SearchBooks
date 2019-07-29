import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Welcome to Search Books App!</h1>
              <p>This app lets you search for books and save them in a Database</p>
              {/* <FormBtn> */}
                <Link to={"/search"}>
                  GET STARTED!
                </Link>
              {/* </FormBtn> */}
            </Jumbotron>
            {/* <Link to={"/books"}>
              <strong>
                Go to saved Books!
              </strong>
            </Link> <br></br>
            <Link to={"/search"}>
              <strong>
                search for new books!
              </strong>
            </Link> */}


            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
