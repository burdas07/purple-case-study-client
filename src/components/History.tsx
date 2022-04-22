import React from "react"

type Props = TransactionProps;

const History:  React.FC<Props> = ({transactions}) => {

    return(
       
        <table className="pure-table pure-table-horizontal center">
        <thead>
            <tr>
                <th>Source Currency</th>
                <th>Source Amount</th>
                <th>Destination Currency</th>
                <th>Destination Amount</th>
                <th>Timestamp</th>
            </tr>
        </thead>
        <tbody>

        {
            transactions && transactions.map((transaction) => {
            const { from, to, amount, result, createdAt } = transaction;
            return (

                <tr>
                <td>{from}</td>
                <td>{amount}</td>
                <td>{to}</td>
                <td>{result}</td>
                <td>{createdAt}</td>
                </tr>
            );
        })}

        </tbody>
    </table>     
    );
};

export default History;