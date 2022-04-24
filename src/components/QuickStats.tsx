import React from 'react';

type Props = QuickStatsProps;

const QuickStats:  React.FC<Props> = ({quickStats}) => {
    

    const { currBought, currBoughtAmount, currSold, currSoldAmount} = quickStats;

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

export default QuickStats;