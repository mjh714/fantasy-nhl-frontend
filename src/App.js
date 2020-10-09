import React from 'react';
import logo from './logo.png';
import './App.css';
import Login from "./Components/Login.js";
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './Components/NavBar.js'
import Home from './Components/Home'
import Signup from './Components/Signup'
import LeagueContainer from './Containers/LeagueContainer'
import TeamContainer from './Containers/TeamContainer'
import CreateLeague from './Components/CreateLeague'

class App extends React.Component {

  state = {
    user: null
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`},
        })
      .then(resp => resp.json())
      .then(data => this.setState({ user: data.user }))
    } 
  };


  signupHandler = (newUser) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newUser)
    }
    fetch("http://localhost:3000/users", options)
    .then(res => res.json())
    .then(data => {
      this.setState({
        user: data.user
      },() => this.props.history.push("/leagues"))
    })
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
      }, () => this.props.history.push("/leagues")) 
    })
  }

  logout = () => {
    localStorage.removeItem("token")
    this.setState({
      user: null
    }, this.props.history.push('/'))
  }

  leagueHandler = (league) => {
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      body: JSON.stringify(league)
  }
    fetch("http://localhost:3000/leagues", options)
    .then(resp => resp.json())
    .then(this.props.history.push("/leagues"))
  }

  render() {
    return (
      <React.Fragment>
        <div style={{"textAlign": "center"}}>
          <img src={logo} alt="logo" style={{"height": "200px"}}/>
        </div>
          <NavBar user={this.state.user} logoutHandler={this.logout}/>
          <Switch>
          <Route exact path="/leagues" render={()=> <LeagueContainer /> } />
          <Route exact path="/teams" render={()=> <TeamContainer /> } />
          <Route exact path="/login" render={()=> <Login loginHandler={this.loginHandler} />}/> 
          <Route exact path="/signup" render={()=> <Signup signupHandler={this.signupHandler} />}/>
          <Route exact path="/leagues/create" render={()=> <CreateLeague leagueHandler={this.leagueHandler}/>}/>
          <Route exact path="/" render={()=> <Home loggedUser={this.state.user}/> }/>
          </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
