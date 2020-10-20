import React from 'react';
import {withRouter} from 'react-router-dom'

class Team extends React.Component {

    state = {
        currentUserTeam: this.props.currentUserTeam
    }

    clickHandler = (e) => {
        let teamID = this.props.team.contracts[0].team_id
        this.props.history.push(`/teams/${teamID}`)
    }

    checkTeam = () => {
        return this.state.currentUserTeam.id === this.props.team.id
    }
    
    render() { 
        return (
            <React.Fragment>
            {this.checkTeam() ? 
                <div style={{"backgroundColor": `${this.props.style}`, "textAlign": "center"}}>
                {this.props.topTeam.name === this.props.team.name ? <h4 onClick={this.clickHandler}> 👑{this.props.team.name}👑 </h4> : <h4 onClick={this.clickHandler}>{this.props.team.name}</h4>}
                </div>
                :
                <div style={{ "textAlign": "center"}}>
                {this.props.topTeam.name === this.props.team.name ? <h4 onClick={this.clickHandler}> 👑{this.props.team.name}👑 </h4>: <h4 onClick={this.clickHandler}>{this.props.team.name}</h4> }
                </div>
            }
            </React.Fragment>
        );
    }
}
 
export default withRouter(Team);