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
import CreateTeam from './Components/CreateTeam'
import TeamShow from './Components/TeamShow'
import SignPlayer from './Components/SignPlayer'
import DropPlayer from './Components/DropPlayer'

class App extends React.Component {

  state = {
    user: null, 
    leagues: [],
    teams: []
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
      .then(data => localStorage.setItem('currentUser', JSON.stringify(data.user)))
      .then(this.setState({ user: JSON.parse(localStorage.getItem('currentUser')) }))
    } 
    fetch("http://localhost:3000/leagues")
    .then(resp => resp.json())
    .then(data => {
        this.setState({
            leagues: data
        })
    })
    fetch("http://localhost:3000/teams")
    .then(resp => resp.json())
    .then(data => {
        this.setState({
            teams: data
        })
    })
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

  teamHandler = (teamObj) => {
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      },
      body: JSON.stringify(teamObj)
  }
    fetch("http://localhost:3000/teams", options)
    .then(resp => resp.json())
    .then(this.props.history.push("/leagues"))
  }

  appAddPlayer = (player, currentTeam) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({contract: {team_id: currentTeam.id, player_id: player.id}})
    }
    fetch("http://localhost:3000/contracts", options)
    .then(resp => resp.json())
    .then(this.props.history.push(`/teams/${currentTeam.id}`))
  }

  appDropPlayer = (player, currentTeam) => {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({contract: {team_id: currentTeam.id, player_id: player.id}})
    }
    fetch("http://localhost:3000/find-contract", options)
    .then(resp => resp.json())
    .then(data => this.deleteContract(data))
  }

  deleteContract = (contract) => {
    let options = {
      method: "DELETE"
    }
    fetch(`http://localhost:3000/contracts/${contract.id}`, options)
    .then(resp => resp.json())
    .then(this.props.history.push(`/teams/${contract.team_id}`))
  }

  render() {
    return (
      <React.Fragment>
        <div style={{"textAlign": "center"}}>
          <img src={logo} alt="logo" style={{"height": "200px"}}/>
        </div>
          <NavBar user={this.state.user} logoutHandler={this.logout}/>
          {this.state.currentUser ? null :
          <Switch>
          <Route exact path="/teams/create" render={() => <CreateTeam currentUser={this.state.user} teamHandler={this.teamHandler} />}/>
          <Route exact path="/leagues/create" render={()=> <CreateLeague leagueHandler={this.leagueHandler}/>}/>
          <Route exact path="/teams/:id/drop-player"  render={({match})=> {
            let id = parseInt(match.params.id)
            let foundTeam = this.state.teams.find(team => team.id === id)
            return <DropPlayer clickHandler={this.appDropPlayer} currentUser={this.state.user} team={foundTeam}/>}}/>
          <Route exact path="/teams/:id" render={({match}) => {
            let userTeamIds = this.state.user.teams.map(team => team.id)
            let id = parseInt(match.params.id)
            let foundTeam = this.state.teams.find(team => team.id === id)
            let userTeam = this.state.teams.filter(function(team){return userTeamIds.includes(team.id)})
            return <TeamShow key={foundTeam.id} userTeam={userTeam} currentUser={this.state.user} team={foundTeam} />
          }} />
          <Route exact path="/leagues/:id" render={({match})=> {
            let id = parseInt(match.params.id)
            let foundLeague = this.state.leagues.find(league => league.id === id)
            return <TeamContainer league={foundLeague} currentUser={this.state.user} teamHandler={this.teamHandler} /> 
          }} />
          <Route exact path="/teams/:id/sign-player" render={({match}) => {
            let id = parseInt(match.params.id)
            let foundTeam = this.state.teams.find(team => team.id === id)
            return <SignPlayer clickHandler={this.appAddPlayer} currentUser={this.state.user} team={foundTeam} />
          }}/>
          <Route exact path="/leagues" render={()=> <LeagueContainer currentUser={this.state.user} leagues={this.state.leagues}/> } />
          <Route exact path="/login" render={()=> <Login loginHandler={this.loginHandler} />}/> 
          <Route exact path="/signup" render={()=> <Signup signupHandler={this.signupHandler} />}/>
          <Route exact path="/" render={()=> <Home loggedUser={this.state.user}/> }/>
          </Switch>}
      </React.Fragment>
    );
  }
}

export default withRouter(App);
