import React from 'react';
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import TableRow from './TableRow'

class DropPlayer extends React.Component {
    state = { 
        players: [],
        skaters: [],
        goalies: []
    }

    componentDidMount = () => {
        fetch(`http://localhost:3000/teams/${JSON.parse(localStorage.getItem('currentTeam')).id}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                players: data.players
            })
            this.getSkaters()
            this.getGoalies()
        })
    }

    getSkaters = () => {
        let skaters = this.state.players.filter(player => player.primary_position_name !== "Goalie")
        this.setState({
            skaters: skaters
        })
    }

    getGoalies = () => {
        let goalies = this.state.players.filter(player => player.primary_position_name === "Goalie")
        this.setState({
            goalies: goalies
        })
    }

    dropPlayer = (e) => {
        let currentPlayer = this.state.players.find(player => player.id === parseInt(e.target.dataset.id))
        this.props.clickHandler(currentPlayer, JSON.parse(localStorage.getItem('currentTeam')))
    }

    render() { 
        console.log(JSON.parse(localStorage.getItem('currentTeam')))
        console.log(this.state)
        return (
            <>
            <h1 style={{"textColor": "black"}}>{JSON.parse(localStorage.getItem('currentTeam')).name}</h1>
            <div>
                <h1>Drop A Player</h1>
            </div>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Assists</th>
                <th>Goals</th>
                <th>PIM</th>
                <th>Shots</th>
                <th>Games</th>
                <th>Hits</th>
                <th>PPG</th>
                <th>PPP</th>
                </tr>
            </thead>
            <tbody onClick={this.dropPlayer} style={{"textColor": "black"}}>
                {this.state.skaters ? <TableRow skaters={this.state.skaters}/>: null}
            </tbody>
            <br />
            <br />
            <thead>
                <tr>
                <th>Full Name</th>
                <th>Position</th>
                <th>Ot</th>
                <th>Shutouts</th>
                <th>Ties</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Saves</th>
                <th>Save Percentage</th>
                <th>Goals Against Average</th>
                </tr>
            </thead>
            <tbody onClick={this.dropPlayer} style={{"textColor": "black"}}>
                {this.state.goalies ? <TableRow goalies={this.state.goalies}/>: null}
            </tbody> 
            </Table>
            </>
        )
    }
}
 
export default withRouter(DropPlayer);