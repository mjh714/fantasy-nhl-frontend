import React from 'react';
import Team from '../Components/Team'
import Button from '@material-ui/core/Button';


class TeamContainer extends React.Component {
    state = { 
        teams: [],
        currentUser: this.props.currentUser, 
        style: "red"
     }

    componentDidMount() {
        fetch('http://localhost:3000/teams/')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                teams: data
            })
        })       
    }

    getTeams = () => {
        let currentTeams = this.state.teams.filter(team => team.league_id === this.props.league.id)
        let currentUserTeam = currentTeams.find(team => team.user_id === this.props.currentUser.id)
        console.log(currentUserTeam)

        return currentTeams.map(team => <Team key={team.id} style={this.state.style} currentUserTeam={currentUserTeam} team={team} currentUser={this.props.currentUser}/>)
    }

    render() { 
        return (
            <>
            <Button href="teams/create">Create A Team</Button>
            <br/>
            <div style={{"background": "#B9B9B9"}}>
                {this.getTeams()}
            </div>
            </>
        )
    }
}
 
export default TeamContainer;