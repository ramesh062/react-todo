import React, { Component } from "react";
import firebase from "../utils/firebase.config";
import { Button, Card, Form, ToastContainer, Toast, Spinner } from 'react-bootstrap';
import { useParams,useNavigate } from "react-router-dom";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoId: '',
      title: '',
      completed: false,
      error: '',
      isLoading: false,
      isValidated: false,
      isShowToster: false,
      message: ""
    }
    console.log("props", props);
    // bind component with event handlers
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // event to handle input change
  handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    else {
      const todoRef = firebase.database().ref('Todo');
      let title = form.title.value;
      let completed = false;
      let todoId = form.todoId.value;
      const todo = {
        title,
        completed
      };

      let isSaved = "";
      if (todoId) {
        const todoRef = firebase.database().ref('Todo').child(todoId);
        todoRef.update(todo);
        this.setState({ message: "Todo is updated", todoId: "" });
        isSaved = 1;
      }
      else {
        todoRef.push(todo);
        this.setState({ message: "Todo is saved" });
        isSaved = 1;
      }

      if (isSaved && this.state.isShowToster === false) {
        this.setState({ isShowToster: true, isLoading: true });
      }
    }
    this.setState({ isValidated: true });
  }

  handleTosterClose = () => {
    this.setState({ isShowToster: !this.state.isShowToster });
  }
  componentDidMount = () => {
    if (this.props.id && this.state.todoId == "") {
      this.setState({ todoId: this.props.id });
    }
  }
  componentDidUpdate = (prevProps) => {
    let _this = this;
    if (this.state.isLoading === true) {
      this.setState({ title: "", todoId: "", isLoading: false, isValidated: true });
      this.setState({ isValidated: false });
      console.log("redirect");
      this.props.history("/todo-lists");
    }
    if (this.state.todoId) {
      const todoRef = firebase.database().ref('Todo').child(this.state.todoId);
      todoRef.on('value', (snapshot) => {
        const todo = snapshot.val();
        this.setState({ title: todo.title, todoId: todo.id, completed: todo.completed });
      });
    }
  }

  render() {
    return (
      <Card border="primary" className="m-5">
        <Card.Header>Add todo</Card.Header>
        <Card.Body>
          <ToastContainer className="p-3" position={"top-center"}>
            <Toast show={this.state.isShowToster} onClose={this.handleTosterClose} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Todo</strong>
                <small>Just now</small>
              </Toast.Header>
              <Toast.Body>{this.state.message}</Toast.Body>
            </Toast>
          </ToastContainer>
          <Form noValidate validated={this.state.isValidated} onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <input type="hidden" name="todoId" value={this.props.id ? this.props.id : ""} onChange={this.handleChange} />
              <Form.Label>Enter todo</Form.Label>
              <Form.Control type="text" placeholder="Enter todo" name="title" value={this.state.title ? this.state.title : ""} required onChange={this.handleChange} />
              <Form.Control.Feedback type="invalid">
                Title is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={this.state.isLoading}>
              {this.state.isLoading ?
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
                :
                <>{this.state.id ? "Update" : "Save"}</>
              }
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default (props) => <TodoForm {...useParams()} {...props} history={useNavigate()} />