import React from 'react';
import {withRouter} from 'react-router-dom'
import { Card } from 'react-bootstrap'

class TeamShow extends React.Component {
    state = { 
        user: this.props.currentUser,
        team: this.props.team
    }

    players = () => {
        return this.props.team.players.map(player => 
        <>
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                {/* <Card className={`${player.primary_position_name.split(' ').join('')}-front`}> */}
                {/* <div className={`${player.primary_position_name.split(' ').join('')}-front`}> */}
                    {/* <Card.Img variant="top" src={player.image}/> */}
                    <img src={player.image} alt='' />
                {/* </Card> */}
                {/* </div> */}
                </div> 
            <div className={"flip-card-back"}>
            {/* <Card className={`${player.primary_position_name.split(' ').join('')}-back`}> */}
            {/* <div className={`${player.primary_position_name.split(' ').join('')}-back`}> */}
            {/* <Card.Title>{player.full_name}</Card.Title> */}
            <h4>{player.full_name}</h4>
            {/* <Card.Body>
                <Card.Text> */}
                    {player.multi_wrong.stat ? 
                        <>
                        {player.multi_wrong.stat.points ? 
                        <>
                        <h4>Goals:{player.multi_wrong.stat.goals}</h4> 
                        <h4>Assists:{player.multi_wrong.stat.assists}</h4>
                        <h4>Points:{player.multi_wrong.stat.points}</h4>
                        </>: null}
                            {player.multi_wrong.stat.saves ?
                            <>
                            <h4>Saves:{player.multi_wrong.stat.saves}</h4>
                            <h4>Wins:{player.multi_wrong.stat.wins}</h4>
                            <h4>Losses:{player.multi_wrong.stat.losses}</h4>
                            </>
                            : null}
                            </>
                    : <h4>No Available Stats</h4>}
                {/* </Card.Text>
            </Card.Body>
            </Card> */}
            </div>
            {/* </div> */}
        </div>
        </div>
        <br/>
        <br/>
        </>)
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
            {this.props.userTeam[0].id === this.state.team.id ?
            <>
            <button onClick={this.clickHandler}>Sign Payer</button>
            <button onClick={this.clicker}>Drop Player</button>
            </>
            : null}
            <h1 style={{"color":"black", "textAlign": "center"}}>{this.state.team.name}</h1>
            {this.players()}
            </>
        )
    }
}

export default withRouter(TeamShow);