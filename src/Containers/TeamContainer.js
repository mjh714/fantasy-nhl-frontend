import React from 'react';
import Team from '../Components/Team'
import Button from '@material-ui/core/Button';

class TeamContainer extends React.Component {
    state = { 
        teams: []
     }

    componentDidMount() {
        // need to make this take ID from league that was clicked on and fetch to league + that ID and get its teams
        fetch("http://localhost:3000/teams")
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                teams: data
            })
        })
    }

    getTeams = () => {
        return this.state.teams.map(team => <Team key={team.id} team={team} />)
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