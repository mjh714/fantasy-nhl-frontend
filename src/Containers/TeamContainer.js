import React from 'react';
import Team from '../Components/Team'
import Button from '@material-ui/core/Button';
// import { FormFile } from 'react-bootstrap';


class TeamContainer extends React.Component {
    state = { 
        teams: [],
        currentUser: this.props.currentUser, 
        style: "red",
        sortedTeams: []
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
        let currentTeamPoints = []
        let currentTeamPointsName = []
        for (const team of currentTeams) {
            for (const player of team.players) {
                if (player.multi_wrong.stat) {
                    if (player.multi_wrong.stat.points) {
                        team.num_of_points += parseInt(player.multi_wrong.stat.points)
                    } else if (player.multi_wrong.stat.wins) {
                        team.num_of_points += parseInt(player.multi_wrong.stat.wins)
                    }
                }
            }
            currentTeamPointsName.push({teamName:team.name, teamPoints:team.num_of_points})
            currentTeamPoints.push({teamPoints:team.num_of_points})
        }
        let currentUserTeam = currentTeams.find(team => team.user_id === this.props.currentUser.id)
        // this.setState({sortedTeams: })
        currentTeams.sort((a,b) => b.num_of_points - a.num_of_points)
        return currentTeams.map(team => <Team key={team.id} teamPoints={team.num_of_points} topTeam={currentTeams[0]} style={this.state.style} currentUserTeam={currentUserTeam} team={team} currentUser={this.props.currentUser}/>)
    }

    render() { 
        return (
            <>
            <Button href="/teams/create">Create A Team</Button>
            <br/>
            <div style={{"background": "#B9B9B9"}}>
                {this.getTeams()}
            </div>
            </>
        )
    }
}

export default TeamContainer;