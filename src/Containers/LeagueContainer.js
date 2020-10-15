import React from 'react';
import League from '../Components/League'
import Button from '@material-ui/core/Button';

class LeagueContainer extends React.Component {

    getLeagues = () => {
        return this.props.leagues.map(league => <League key={league.id} league={league} />)
    }

    userLeagues = () => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'))
        return currentUser.leagues.map(league => <League key={league.id} league={league} />)
    }

    render() { 
        return (
            <>
            <Button href="leagues/create">Create A League</Button>
            <br/>
            <div style={{"background": "#B9B9B9"}}>
                <h4>My Leagues</h4>
                {this.userLeagues()}
            </div>
            <div style={{"background": "#B9B9B9"}}>
                <h4>All Leagues</h4>
                {this.getLeagues()}
            </div>
            </>
        )
    }
}
 
export default LeagueContainer;