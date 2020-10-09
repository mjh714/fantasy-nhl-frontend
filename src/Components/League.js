import React from 'react';


class League extends React.Component {

    
    render() { 
        return (
            <div>
                <h4>{this.props.league.name}</h4> 
            </div>
        );
    }
}
 
export default League;