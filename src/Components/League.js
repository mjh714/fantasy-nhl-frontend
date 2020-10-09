import React from 'react';
import { withRouter } from 'react-router-dom'


class League extends React.Component {

    clickHandler = (e) => {
        let leagueID = this.props.league.id
        this.props.history.push(`/leagues/${leagueID}`)
    }
    
    render() { 
        return (
            <div>
                <h4 onClick={this.clickHandler}>{this.props.league.name}</h4> 
            </div>
        );
    }
}
 
export default withRouter(League);