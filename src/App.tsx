// /* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import QuickStats from "./components/QuickStats";
import History from "./components/History";

// chtel jsem to inicializovat ze serveru pres api, ale whatever..
const currencyList = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];

// input fields size and max lenght
var inputMax = 8;



/** PREDELAT DO .ENV !!!!!!!! */
export const port = 1337;
export const baseUrl = `http://localhost:${port}`
export const convertApi = "/api/convert/money?"
export const clearApi = "/api/transaction/clear"
export const transactionApi = "/api/transaction"
export const transactionUrl= "http://localhost:1337/api/transaction";


// export function useForceUpdate() {
//   const [, setTick] = useState(0);
//   const update = useCallback(() => {
//     setTick(tick => tick + 1);
//   }, [])
//   return update;
// }


function App() {

  // Hooks for handling input
  const [currencyFrom, setCurrencyFrom] = useState("EUR"); // currency from
  const [currencyFromAmount, setCurrencyFromAmount] = useState(1); // currency from amount
  const [currencyTo, setCurrencyTo] = useState("USD"); // currency To
  const [currencies] = useState(currencyList);

    // Hooks for handling results
  const [currencyToAmount, setCurrencyToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [quickStats, setQuickStats] = useState<IQuickStats>({currBought:"",  currBoughtAmount:0, currSold: "", currSoldAmount: 0});
  // const [quickStats, setQuickStats] = useState({currBought:"EUR",  currBoughtAmount:0, currSold: "USD", currSoldAmount: 0});
  
  // Transcations
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  useEffect(() => {
    console.log(`Running Transaction useeffect`);
      console.log(transactions);
      fetchTransactions();
    }, []);

  // quickstats are dependant on transaction change
  useEffect(() => {
    console.log("Running quickStats useEffect");
    console.log(transactions);
    computeQuickStats();
    // console.log(`Current values =${quickStats.currBought} ${quickStats.currBoughtAmount} ${quickStats.currSold} ${quickStats.currSoldAmount}`);
  // });
  },transactions);

  const fetchTransactions = (): void => {
    getTransactions()
    .then(({ data: { transactions } }: ITransaction[] | any) => setTransactions(transactions))
    .catch((err: Error) => console.log(err))
  }

  const clearGui = () => {
      
    setQuickStats({currBought:"",  currBoughtAmount:0, currSold: "", currSoldAmount : 0});
    setExchangeRate("");
    setCurrencyToAmount("");
  }

  /** Convert Button */
  const handleConvertClicked = async () => {

    // osetrit vstupy na strane klienta!!!!
    if(currencyFrom === currencyTo || (currencyFromAmount ===0)) {
      setCurrencyToAmount("");
      setExchangeRate("");
      return;
    }
    
    // create request
    var request = `${baseUrl}${convertApi}from=${currencyFrom}&to=${currencyTo}&amount=${currencyFromAmount}`;

    // Call our API to receive convert result
    const resConvert = await axios(request);
    const convertResult = resConvert.data as IConvertResult;
    setCurrencyToAmount(convertResult.result.toFixed(2));
    
    // exchange rate
    const exchangeRate = computeTransferRate(convertResult.amount, convertResult.result);
    setExchangeRate(exchangeRate.toFixed(2));

    // refresh database
    fetchTransactions();

    // calculate statistics
    computeQuickStats();
    
}


const getTransactions = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.get(transactionUrl);
    console.log("receiving transactions via api");
    console.log(transactions);
    
    return transactions

  } catch (error) {
    throw new Error("Something bad happened")
  } finally {
    // compute quickStats here maybe?

  }
}

// not very effective, but simple
const computeQuickStats = () : void => {

  console.log("Calculating quickstats....");
  console.log(transactions);

  // Get most Sold Currency
  var fromCurrencies: string[] = [];
  for(var i=0; i<transactions.length; i++){

    var currentFrom:string = transactions[i].from;

    // eslint-disable-next-line no-loop-func
    if(!fromCurrencies.find(elem => elem === currentFrom)){
      fromCurrencies = fromCurrencies.concat(currentFrom);
    }
  }

  var fromCurrenciesAmount: number[] = [];
  for (i=0; i<fromCurrencies.length; i++){
    var amountFrom:number =  getCurrencyFromSum(fromCurrencies[i]);
    fromCurrenciesAmount.push(amountFrom);
  }

  const maxAmountFrom = Math.max(...fromCurrenciesAmount);
  const indexFrom = fromCurrenciesAmount.indexOf(maxAmountFrom);
  // console.log(`There is most ${fromCurrencies[indexFrom]} sold: ${fromCurrenciesAmount[indexFrom]}`);

  var maxCurrencySold = fromCurrencies[indexFrom] || "";
  var maxCurrencySoldAmount = fromCurrenciesAmount[indexFrom] || 0;

// --------------------------------------------------------------------------------------------
    // Get most Bought Currency
    var toCurrencies: string[] = [];
    for(i=0; i<transactions.length; i++){
        var currentTo:string = transactions[i].to;
  
      // eslint-disable-next-line no-loop-func
      if(!toCurrencies.find(elem => elem === currentTo)){
        toCurrencies = toCurrencies.concat(currentTo);
      }
    } 
  
    var toCurrenciesAmount: number[] = [];
    for (i=0; i<toCurrencies.length; i++){
      var amountTo:number =  getCurrencyToSum(toCurrencies[i]);
      toCurrenciesAmount.push(amountTo);
    }  
    const maxAmountTo = Math.max(...toCurrenciesAmount);
    const indexTo = toCurrenciesAmount.indexOf(maxAmountTo);

    var maxCurrencyBought = toCurrencies[indexTo] || "";
    var maxCurrencyBoughtAmount = toCurrenciesAmount[indexTo] || 0;

    console.log(`There is most ${maxCurrencyBought} bought: ${maxCurrencyBoughtAmount}`);
    console.log(`There is most ${maxCurrencySold} sold: ${maxCurrencySoldAmount}`);
    setQuickStats({currBought:maxCurrencyBought,  currBoughtAmount:maxCurrencyBoughtAmount, currSold: maxCurrencySold, currSoldAmount : maxCurrencySoldAmount});
}



function getCurrencyFromSum (curr:string) :number
{
  var total = 0;
  for(var i=0; i<transactions.length; i++){

    if(transactions[i].from === curr){
      total += transactions[i].amount;
    };
  }
  // console.log(`Total ${curr} spent: ${total}`);
  return total;
}

function getCurrencyToSum (curr:string) :number
{
  var total = 0;
  for(var i=0; i<transactions.length; i++){

    if(transactions[i].to === curr){
      total += transactions[i].result;
    };
  }
  // console.log(`Total ${curr} spent: ${total}`);
  return total;
}

  /** Clear Database Button */
const handleClearDBClicked = async () =>{

  // call database clear and reload
  const historyUrl = `${baseUrl}${clearApi}`;
  const request = historyUrl;
  await axios(request);
  fetchTransactions();
  computeQuickStats();
  clearGui();
}

const handleInputCurrFromChanged = (event: ChangeEvent<{ value: string }>) => {
  setCurrencyFrom(event?.currentTarget?.value);
}

const handleInputCurrToChanged = (event: ChangeEvent<{ value: string }>) => {
  setCurrencyTo(event?.currentTarget?.value);
}

const handleInputCurrFromAmountChanged = (event: ChangeEvent<{ value: string }>) => {

  var value = event?.currentTarget?.value;
  if (value === "") {
    setCurrencyFromAmount(0);    
    return;
  }

  var number = parseFloat(value);
  setCurrencyFromAmount(number);
}

const computeTransferRate = (x:number, y:number) => {

  // check for null div
  if(x === 0) {
    return 0;}

  if(y === 0) {
    return 0;}

  return y/x;
}

  console.log("In App");
  console.log(transactions);

  return (
    <div>
      <div className="splash-container">
        <div className="splash">
          <h1 className="splash-head">Currency Converter</h1>
          <div className="pure-g">
              {/* <!-- from currency --> */}
              <div className="pure-u-1-5">
                  <p>From<br/>
                  <select name="currency" id="currencyFrom" className="input-money-select" value={currencyFrom} onChange={handleInputCurrFromChanged}>
                    {currencies.map((currencies) => <option key={currencies}>{currencies}</option>)}
                  </select></p>
              </div>
              {/* <!-- from amount --> */}
              <div className="pure-u-1-5">
                  <p>Amount<br/><input type="string" size={inputMax} maxLength={inputMax} id="amountFrom" name="amountFrom" className="input-number" value={currencyFromAmount} onChange={handleInputCurrFromAmountChanged}/></p>
              </div>
              {/* <!-- to currency --> */}
              <div className="pure-u-1-5">
                  <p>To<br/>
                  <select name="currency" id="currencyTo" className="input-money-select" value={currencyTo} onChange={handleInputCurrToChanged}>
                    {currencies.map((currencies) => <option>{currencies}</option>)}
                  </select></p>
              </div>
              {/* <!-- to amount --> */}
              <div className="pure-u-1-5">
                  <p>Result<br/><input type="text" size={inputMax} id="amountTo" className="input-result" name="amountTo" disabled value={currencyToAmount}
                  /></p>
              </div>
              {/* <!-- exchange rate --> */}
              <div className="pure-u-1-5">
                  <p>Rate<br/><input type="text" size={inputMax} id="exchangeRate" className="input-result" name="exchangeRate" disabled value={exchangeRate}/></p>
              </div>
              {/* <!-- convert and clear DB buttons --> */}
            </div>
            <p><button onClick={handleConvertClicked} className="pure-button pure-button-primary">Convert</button></p>
            <p><button onClick={handleClearDBClicked} className="pure-button pure-button-primary">Clear Database</button></p>
          </div>
      </div>

      {/* transaction history */}
      <div className="content-wrapper">
        <div className="content center" style={{width: '85%', margin: 'auto'}}>

          <h3 className="content-subhead is-center">Quick Stats</h3>
          <p className="is-center">Receiving all the transactions and making easy calculations on client side. Scroll down to browse transaction history.</p> 
          <QuickStats quickStats={quickStats}/>

          <h3 className="content-subhead is-center">Transaction History</h3>
          <History transactions={transactions}/>
        
      </div>
    </div>   
  </div>

  );
}

export default App;
