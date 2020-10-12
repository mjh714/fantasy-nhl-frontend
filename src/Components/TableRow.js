import React from 'react';

class TableRow extends React.Component {

    skatersMultiWrong = () => {
        let multiPlayers = this.props.skaters.filter(player => Object.keys(player.multi_wrong).length > 0)
        return multiPlayers.map((player) => {
            return (
            <React.Fragment>
            <td>{player.multi_wrong["stat"]['assists']}</td>
            <td>{player.multi_wrong["stat"]["goals"]}</td> 
            <td>{player.multi_wrong["stat"]["pim"]}</td>
            <td>{player.multi_wrong["stat"]["shots"]}</td>
            <td>{player.multi_wrong["stat"]["games"]}</td>
            <td>{player.multi_wrong["stat"]["hits"]}</td>
            <td>{player.multi_wrong["stat"]["powerPlayGoals"]}</td>
            <td>{player.multi_wrong["stat"]["powerPlayPoints"]}</td> 
            </React.Fragment> 
            )
        })
    }

    goaliesMultiWrong = () => {
        let multiPlayers = this.props.goalies.filter( player => Object.keys(player.multi_wrong).length > 0)
        return multiPlayers.map((player) => {
            return (
                <React.Fragment>
                <td>{player.multi_wrong["stat"]['ot']}</td>
                <td>{player.multi_wrong["stat"]["shutouts"]}</td>
                <td>{player.multi_wrong["stat"]["ties"]}</td>
                <td>{player.multi_wrong["stat"]["wins"]}</td>
                <td>{player.multi_wrong["stat"]["losses"]}</td>
                <td>{player.multi_wrong["stat"]["saves"]}</td>
                <td>{player.multi_wrong["stat"]["savePercentage"]}</td>
                <td>{player.multi_wrong["stat"]["goalAgainstAverage"]}</td>
                </React.Fragment> 
            )
        })
    }

    skaters = () => {
       return this.props.skaters.map((player) => {
           return (
            <React.Fragment>
                <tr>
                    <td>{player.full_name}</td>
                    <td>{player.primary_position_name}</td>
                    {/* {this.skatersMultiWrong()} */}
                </tr>
            </React.Fragment>
           )
        })
    }

    goalies = () => {
        return this.props.goalies.map((player) => {
            return (
                <React.Fragment> 
                    <tr>
                    <td>{player.full_name}</td>
                    <td>{player.primary_position_name}</td>
                    {/* {this.goaliesMultiWrong()} */}
                    </tr>
                </React.Fragment>
            )
        })
    }

    render() { 
        console.log(this.props.goalies)
        console.log(this.props.skaters)
        return (
            <React.Fragment>
                {/* <tbody style={{"textColor": "black"}}> */}
                {/* <tr> */}
                    {this.props.goalies ? this.goalies() : null}
                    {this.props.skaters ? this.skaters() : null}
                {/* </tr> */}
                {/* </tbody> */}
            </React.Fragment>
         );
    }
}
 
export default TableRow;