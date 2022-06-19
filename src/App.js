import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch, withRouter } from 'react-router-dom';
import Home from './components/Home';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';
import { Navbar, Container, NavItem, NavDropdown, Nav, NavLink } from 'react-bootstrap';
import logo from './logo.svg';


class App extends Component {
  constructor(props) {
    super(props);
    // set the state of the app
    this.state = {
      todo: {},
      loggedIn: false
    }
    console.log("props", props);
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Todo
            </Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/" className={"nav-link"}>Home</Link>
              <Link to="/add-todo" className={"nav-link"}>Add todo</Link>
              <Link to="/todo-lists" className={"nav-link"}>Todos</Link>
            </Nav>
          </Container>
        </Navbar>
        <div className="App">
          <Routes>
            <Route exact path='/' element={< Home />}></Route>
            <Route path='/add-todo' element={< TodoForm />}></Route>
            <Route path='/todo-lists' element={< TodoList />}></Route>
            <Route path='/edit-todo' exact={true} element={< TodoForm />}></Route>
            <Route path='/edit-todo/:id' exact={true} element={< TodoForm />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
