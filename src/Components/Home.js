import React from 'react';
import StanleyCup from '../Stanley-Cup.jpg';


class Home extends React.Component {
    state = {  }
    render() { 
        return (
            <div style={{"textAlign": "center"}}>
                <img src={StanleyCup} className="App-logo" alt="Stanley-Cup" />
            </div>
        )
    }
}
 
export default Home;