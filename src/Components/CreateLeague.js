import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class CreateLeague extends React.Component {
    state = { 
        name: ""
     }

    changer = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.leagueHandler(this.state)
    }
    
    render() { 
        return ( 
            <form onSubmit={this.submitHandler}>
                <TextField type="text" value={this.state.name} onChange={this.changer}/>
                <Button type="submit" color="default">Create League!</Button>
            </form>
         );
    }
}
 
export default CreateLeague;