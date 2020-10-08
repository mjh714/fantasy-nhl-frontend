import React from 'react';
import logo from './logo.png';
import './App.css';
import Login from "./Components/Login.js";
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar.js'
import Home from './Components/Home'
import Signup from './Components/Signup'

class App extends React.Component {

  state = {
    user: null
  }

  loginHandler = (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(user)
    }
    fetch("http://localhost:3000/login", options)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.jwt)
      this.setState({
        user: data.user
      }) // add history.push for after login
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="logo" style={{"height": "200px"}}/>
          <NavBar />
          <Switch>
          <Route exact path="/login" component={()=> <Login loginHandler={this.loginHandler} />}/> 
          <Route exact path="/signup" component={()=> <Signup signupHandler={this.signupHandler} />}/>
          <Route exact path="/" component={()=> <Home loggedUser={this.state.user}/> }/>
          </Switch>
        </header>
      </div>
    );
  }
}

export default withRouter(App);
