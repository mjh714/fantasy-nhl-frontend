import React from 'react';
import { withRouter } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import TableRow from './TableRow'

class SignPlayer extends React.Component {
    state = { 
        team: this.props.team,
        freeAgents: [],
        skatersArr: [],
        goaliesArr: []
     }

    componentDidMount = () => {
         fetch("http://localhost:3000/players")
         .then(resp => resp.json())
         .then(data => {
            let freeAgentsArr = data.filter(player => player.contracts.length === 0)
            this.setState({
                freeAgents: [...freeAgentsArr]
            })
            this.skatersFreeAgents()
            this.goaliesFreeAgents()
         })
    }

    skatersFreeAgents = () => {
        let skatersArr = this.state.freeAgents.filter(player => player.primary_position_name !== "Goalie")
        this.setState({
            skatersArr: skatersArr
        })
        // return skatersArr.map((player) => ) 
     }

     goaliesFreeAgents = () => {
        let goaliesArr = this.state.freeAgents.filter(player => player.primary_position_name === "Goalie")
        this.setState({
            goaliesArr: goaliesArr
        })
        // return goaliesArr.map(player => <TableRow key={player.id} player={player} />)
     }

    addToTeam = (e) => {
        let currentPlayer = this.state.freeAgents.find(player => player.id === parseInt(e.target.dataset.id))
        this.props.clickHandler(currentPlayer, this.props.team)
    }
    
    render() { 
        return (
            <>
            <h1 style={{"textColor": "black"}}>{this.props.team.name}</h1>
            <div>
                <h1>Free Agents</h1>
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
            <tbody onClick={this.addToTeam} style={{"textColor": "black"}}>
                {/* {this.skatersFreeAgents()} */}
                {this.state.skatersArr ? <TableRow skaters={this.state.skatersArr}/>: null}
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
            <tbody onClick={this.addToTeam} style={{"textColor": "black"}}>
                {/* {this.goaliesFreeAgents()} */}
                {this.state.goaliesArr ? <TableRow goalies={this.state.goaliesArr}/>: null}
            </tbody> 
            </Table>
            </>
          );
    }
}
 
export default withRouter(SignPlayer);