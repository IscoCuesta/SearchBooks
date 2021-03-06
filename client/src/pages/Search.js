import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { set } from "mongoose";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    image: "",
    link: "",
    synopsis: "",
    key: "",
    id: 0
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    this.setState({title: ""});
    this.render()
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  saveBook = id => {
    const saveData = this.state.books.filter(book => book.key == id);
    console.log(id, saveData)
    API.saveBook(saveData[0])
    //   // .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({books: []});
    if (this.state.title) {
      API.getGoogleBook({
        title: this.state.title
      })
        .then(res => {
          console.log(res);
          let numb = 0;
          res.data.items.map(book => {
            let resBook = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors[0],
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.previewLink,
            key: book.id,
            id: numb++,
            synopsis: book.volumeInfo.description
            };
            const newBooks = this.state.books;
            newBooks.push(resBook);
          this.setState({ books: newBooks })
          })
        })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>What Books ? Search!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Search Books"
              />
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.key}>
                    <img src={book.image}></img>
                    <Link to={"/books/" + book.key}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link><br></br>
                    <a href={book.link}>
                      <strong>
                        Check out Book
                      </strong>
                    </a>
                    <FormBtn
                      data-key={book.key}
                      onClick={(evt) => {
                        const el = evt.target
                        this.saveBook(el.dataset.key)}}
                        >
                        SAVE BOOK
                      </FormBtn>
                    </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
