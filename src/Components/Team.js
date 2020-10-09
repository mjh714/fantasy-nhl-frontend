import React from 'react';


class Team extends React.Component {

    
    render() { 
        return (
            <div>
                <h4>{this.props.team.name}</h4> 
            </div>
        );
    }
}
 
export default Team;