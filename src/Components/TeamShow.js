import React from 'react';
import {withRouter} from 'react-router-dom'

class TeamShow extends React.Component {
    state = { 
        user: this.props.currentUser,
        team: this.props.team
     }
     render() {
         console.log(this.state.team)
         return(
             <>
             <h1 style={{"color":"black"}}>HI</h1>
             <h1>fds</h1>
             </>
         )
     }
}
 
export default withRouter(TeamShow);