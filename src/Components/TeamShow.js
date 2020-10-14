import React from 'react';
import {withRouter} from 'react-router-dom'
import { Card } from 'react-bootstrap'

class TeamShow extends React.Component {
    state = { 
        user: this.props.currentUser,
        team: this.props.team
    }

    players = () => {
        return this.props.team.players.map(player => <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={player.image} />
        <Card.Body>
        <Card.Title>{player.full_name}</Card.Title>
        </Card.Body>
        </Card>)
    }

    clickHandler = () => {
        let teamId = this.props.team.id
        this.props.history.push(`/teams/${teamId}/sign-player`)
    }

    clicker = () => {
        let teamId = this.props.team
        localStorage.setItem('currentTeam', JSON.stringify(this.state.team))
        this.props.history.push(`/teams/${teamId}/drop-player`)
    }

    render() {
        return(
            <>
            <button onClick={this.clickHandler}>Sign Payer</button>
            <button onClick={this.clicker}>Drop Player</button>
            <h1 style={{"color":"black", "textAlign": "center"}}>{this.state.team.name}</h1>
            {this.players()}
            </>
        )
    }
}

export default withRouter(TeamShow);