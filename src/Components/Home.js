import React from 'react';
import StanleyCup from '../Stanley-Cup.jpg';


class Home extends React.Component {
    state = {  }
    render() { 
        return (
            <img src={StanleyCup} className="App-logo" alt="Stanley-Cup" style={{"zIndex": "1"}} />
        )
    }
}
 
export default Home;