import React from 'react';

class TableRow extends React.Component {

    skatersMultiWrong = (player) => {
        if (player.multi_wrong.stat) {
            return (
                <React.Fragment>
                        <td data-id={player.id}>{player.multi_wrong["stat"]['assists']}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["goals"]}</td> 
                        <td data-id={player.id}>{player.multi_wrong["stat"]["pim"]}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["shots"]}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["games"]}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["hits"]}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["powerPlayGoals"]}</td>
                        <td data-id={player.id}>{player.multi_wrong["stat"]["powerPlayPoints"]}</td>
                </React.Fragment> 
                )
        } else {
            return <td>{"No Available Stats"}</td>
        }
    }

    goaliesMultiWrong = (player) => {
            if (player.multi_wrong.stat) {
                return (
                    <React.Fragment>
                    <td data-id={player.id}>{player.multi_wrong["stat"]['ot']}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["shutouts"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["ties"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["wins"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["losses"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["saves"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["savePercentage"]}</td>
                    <td data-id={player.id}>{player.multi_wrong["stat"]["goalAgainstAverage"]}</td>
                    </React.Fragment> 
                )
            } else {
                return <td>{"No Available Stats"}</td>
            }
    }

    skaters = () => {
       return this.props.skaters.map((player) => {
           return (
            <React.Fragment>
                <tr>
                    <td data-id={player.id}>{player.full_name}</td>
                    <td data-id={player.id}>{player.primary_position_name}</td>
                    {this.skatersMultiWrong(player)}
                </tr>
            </React.Fragment>
           )
        })
    }

    goalies = () => {
        return this.props.goalies.map((player) => {
            // console.log(player)
            return (
                <React.Fragment> 
                    <tr>
                    <td data-id={player.id}>{player.full_name}</td>
                    <td data-id={player.id}>{player.primary_position_name}</td>
                    {this.goaliesMultiWrong(player)}
                    </tr>
                </React.Fragment>
            )
        })
    }

    render() { 
        // console.log(this.props.goalies)
        // console.log(this.props.skaters)
        return (
            <React.Fragment>
                    {this.props.goalies ? this.goalies(): null}
                    {this.props.skaters ? this.skaters() : null}
            </React.Fragment>
         );
    }
}
 
export default TableRow;