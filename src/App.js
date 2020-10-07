import React from 'react';
import StanleyCup from './Stanley-Cup.jpg';
import './App.css';
import Login from "./Components/Login.js";
import { Switch, Route, withRouter } from 'react-router-dom';

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
        user: data.user,
        userCourses: data.user.courses
      }, () => this.props.history.push("/users/courses"))
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Fantasy NHL</h1>
          <img src={StanleyCup} className="App-logo" alt="Stanley-Cup" />
          <Route exact path="/login" component={()=> <Login loginHandler={this.loginHandler} />}/> 
        </header>
      </div>
    );
  }
}

export default App;
