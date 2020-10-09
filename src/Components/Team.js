import React from 'react';
import {withRouter} from 'react-router-dom'

class Team extends React.Component {

    clickHandler = (e) => {
        let teamID = this.props.team.contracts[0].team_id
        this.props.history.push(`/teams/${teamID}`)
    }
    
    render() { 
        return (
            <div>
                <h4 onClick={this.clickHandler}>{this.props.team.name}</h4> 
            </div>
        );
    }
}
 
export default withRouter(Team);