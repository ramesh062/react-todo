import React, { Component } from "react";
import firebase from "../utils/firebase.config";
import { Button, Card, Form, ToastContainer, Toast, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";

class TodoList extends Component {
    constructor(props) {
        super(props);
        // set the state of the app
        this.state = {
            todos: [],
            title: "",
            id: "",
            error: '',
            isLoading: false,
            message: "",
            isShowToster: false
        }
    }

    componentDidMount = () => {
        const todoRef = firebase.database().ref('Todo');
        let _this = this;
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                if (todos[id].title)
                    todoList.push({ id, ...todos[id] });
            }
            _this.setState({ todos: todoList });
        });
    }

    editTodo(todo) {
        this.props.parentCallback(todo);
    }

    deleteTodo(todo) {
        const todoRef = firebase.database().ref('Todo').child(todo.id);
        if (todoRef.remove()) {
            this.setState({ isShowToster: true, message: "Todo is deleted" });
        }
    }


    handleTosterClose = () => {
        this.setState({ isShowToster: !this.state.isShowToster });
    }

    render() {
        return (
            <div>
                <ToastContainer className="p-3" position={"top-center"}>
                    <Toast show={this.state.isShowToster} onClose={this.handleTosterClose} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Todo</strong>
                            <small>Just now</small>
                        </Toast.Header>
                        <Toast.Body>{this.state.message ? this.state.message : ""}</Toast.Body>
                    </Toast>
                </ToastContainer>
                <Card border="info" className="m-5">
                    <Card.Header>Todo List</Card.Header>
                    <Card.Body>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.todos ?
                                    this.state.todos.map((todo, index) =>
                                        <tr key={"todo-" + index}>
                                            <td>{index + 1}</td>
                                            <td>{todo.title}</td>
                                            <td>
                                                <Link to={"/edit-todo/" + todo.id}  className="btn btn-sm btn-info">Edit</Link>
                                                <button onClick={() => { this.deleteTodo(todo) }} className="btn btn-sm btn-warning">Delete</button>
                                            </td>
                                        </tr>)
                                    :
                                    ''}
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default TodoList;
