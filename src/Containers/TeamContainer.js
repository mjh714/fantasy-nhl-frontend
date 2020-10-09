import React from 'react';
import Team from '../Components/Team'
import Button from '@material-ui/core/Button';


class TeamContainer extends React.Component {
    state = { 
        teams: []
     }

    componentDidMount() {
        // console.log(this.props.league)
        // need to make this take ID from league that was clicked on and fetch to league + that ID and get its teams
        fetch('http://localhost:3000/teams/')
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                teams: data
            })
         })       
    }

    getTeams = () => {
        let currentTeams = this.state.teams.filter(team => team.league_id === this.props.league.id ) 
        return currentTeams.map(team => <Team key={team.id} team={team}/>)
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