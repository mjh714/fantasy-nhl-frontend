import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CreateTeam extends React.Component {
    state = { 
        name: "", 
        user_id: JSON.parse(localStorage.getItem('currentUser'))['id'],
        league_id: JSON.parse(localStorage.getItem('leagueObj'))['leagueObj']['id']
    }

    changer = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.teamHandler(this.state)
    }

    render() { 
        console.log(this.state)
        return (
            <form onSubmit={this.submitHandler}>
                <TextField type="text" value={this.state.name} onChange={this.changer}/>
                <Button type="submit" color="default">Create Team!</Button>
            </form>
         )
    }
}
 
export default CreateTeam;