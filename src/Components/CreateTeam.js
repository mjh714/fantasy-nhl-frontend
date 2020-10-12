import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CreateTeam extends React.Component {
    state = { 
        name: "", 
        user: this.props.currentUser,
        league: this.props.currentLeague
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
        return (
            <form onSubmit={this.submitHandler}>
                <TextField type="text" value={this.state.name} onChange={this.changer}/>
                <Button type="submit" color="default">Create Team!</Button>
            </form>
         )
    }
}
 
export default CreateTeam;