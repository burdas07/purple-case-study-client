import React from "react"
//export const quickStatsDefault : IQuickStats = { currBought:"EUR", currBoughtAmount:0, currSold:"EUR", currSoldAmount:0 };


type Props = TransactionProps;

//const History:  React.FC<Props> = (transactions) => {
const History:  React.FC<Props> = ({transactions}) => {
// const History = () => {

    console.log("History");
    console.log(transactions);


    return(

        <div>

            {
                transactions && transactions.map((transaction) => {
                const { from, to, amount, result } = transaction;
                return (
                    <div key={from}>
                        <h5> {to} </h5>
                        <h6> Assigned to user: {amount} </h6>
                    </div>
                );
            })}


        
        
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
            <tr>
                <td>USD</td>
                <td>2009</td>
                <td>EUR</td>
                <td>1995</td>
                <td>4:20 4/20/2022</td>
            </tr>
            <tr>
                <td>USD</td>
                <td>2009</td>
                <td>EUR</td>
                <td>1995</td>
                <td>4:20 4/20/2022</td>
            </tr>
            <tr>
                <td>USD</td>
                <td>2009</td>
                <td>EUR</td>
                <td>1995</td>
                <td>4:20 4/20/2022</td>
            </tr>
        </tbody>
    </table>   

    </div>
    

    );

};

export default History;

//export default function history(){};