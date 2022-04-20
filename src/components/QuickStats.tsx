import React from 'react';

interface IQuickStats {
    currBought: string,
    currBoughtAmount: number,
    currSold: string,
    currSoldAmount: number
}


//const quickStats = ({ currBought, currBoughtAmount, currSold, currSoldAmount} : IQuickStats) => {
const quickStats: React.FC<IQuickStats> = ({ currBought, currBoughtAmount, currSold, currSoldAmount}) => {

    return (


        <table className="pure-table pure-table-horizontal center">
        <tbody>
        <tr>
            <th>Most Bought Currency</th>
            <td>{currBought}</td>
        </tr>
        <tr>
            <th>Total EUR Bought</th>
            <td>{currBoughtAmount}</td>
        </tr>
        <tr>
            <th>Most Sold Currency</th>
            <td>{currSold}</td>
        </tr>
        <tr>
            <th>Total Sold  </th>
            <td>{currSoldAmount}</td>
        </tr>
        </tbody>
    </table>

    );


};

export default quickStats;