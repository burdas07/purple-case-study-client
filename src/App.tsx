/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
//import TodoList from "./components/TodoList";
import axios from "axios";
import QuickStats from "./components/QuickStats";
import History from "./components/History";

// chtel jsem to inicializovat ze serveru pres api, ale whatever..
const currencyList = ["AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP","CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS","SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS","UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR","XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"];

// input fields size and max lenght
var inputMax = 8;

// Fixer consts -> EUR Base in default, 100 requests/month
const baseUrlFixer = "http://data.fixer.io/api/latest";
const API_KEY_FIXER = "097cd31d6a3fd259bc62cac11e08e5d1";

// Open Exchange rate consts -> USD base in default, 1000 requests/month
const baseUrlOER = "http://openexchangerates.org/api/latest.json"
const API_KEY_OER =  "18abbc2925cf4d0384b83f625045a91a";

const ratesAPI = "http://localhost:1337/api/convert/getrates";
const getRatesTest = "http://localhost:1337/api/convert/money?from=CZK&to=EUR&amount=5378";

const convertUrl = "http://localhost:1337/api/convert/money?"

const countries = {
  countries: [
    {id: 'AFG', name: 'Afghanistan'},
    {id: 'ALA', name: 'Aland Islands'},
    {id: 'ALB', name: 'Albania'}
  ]
};

function App() {

  // Hooks for handling input
  const [currencyFrom, setCurrencyFrom] = useState("EUR"); // currency from
  const [currencyFromAmount, setCurrencyFromAmount] = useState(1); // currency from amount
  const [currencyTo, setCurrencyTo] = useState("EUR"); // currency To
  

  // Hooks for handling results
  const [currencyToAmount, setCurrencyToAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [history, setHistory] = useState({});

  // init selectboxes
  const [currencies, setCurrencies] = useState(currencyList);



interface IConverResult {
  amount: number,
  from: string
  message: string,
  result: number,
  to: string
}

//let map = new Map<string,string>(rates);

// 
  const handleConvertClicked = async () => {

    console.log(`We are trying to convert ${currencyFromAmount} ${currencyFrom} into ${currencyTo}`);

    // osetrit vstupy na strane klienta!!!!

    var request = convertUrl + `from=${currencyFrom}&to=${currencyTo}&amount=${currencyFromAmount}`;
    console.log(`request URL: ${request}`)

    // from=CZK&to=EUR&amount=5378

    // First API call related to the checkbox
    const resConvert = await axios(request);
    console.log("Calling our convert API: " + request);
    console.log("convert result: ");
    console.log(resConvert);

    console.log(resConvert.data);

    const convertResult = resConvert.data as IConverResult;

    setCurrencyToAmount(convertResult.result.toFixed(2));
    console.log(`Mame vysledek: ${convertResult.result}`);
    
    // tady vypocitame kurz
    const exchangeRate = computeTransferRate(convertResult.amount, convertResult.result);
    // console.log(`Exchange rate: ${exchangeRate}`);
    setExchangeRate(exchangeRate.toFixed(2));

}


const handleInputCurrFromChanged = (event: ChangeEvent<{ value: string }>) => {
  setCurrencyFrom(event?.currentTarget?.value);
  // console.log("currency from changed to: " + currencyFrom);
}

const handleInputCurrFromAmountChanged = (event: ChangeEvent<{ value: string }>) => {

  var value = event?.currentTarget?.value;
  if (value === "") {
    setCurrencyFromAmount(0);    
    return;
  }

  var number = parseFloat(value);
  setCurrencyFromAmount(number);
  // console.log("currency from amount changed to: " + currencyFromAmount);
}


const handleInputCurrToChanged = (event: ChangeEvent<{ value: string }>) => {
  setCurrencyTo(event?.currentTarget?.value);
  // console.log("currency to changed to: " + currencyTo);
}


const computeTransferRate = (par1:number, par2:number) => {

  // check for null div
  if(par1 === 0) {
    return 0;}

  if(par2 === 0) {
    return 0;}

  return par1/par2;
}


// let countriesList = countries.length > 0
// 		&& countries.map((item, i) => {
// 		return (
// 			<option key={i} value={item.id}>{item.name}</option>
// 		)
// 	};

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
                    {currencies.map((currencies) => <option>{currencies}</option>)}
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
                  <p>Exchange Rate<br/><input type="text" size={inputMax} id="exchangeRate" className="input-result" name="exchangeRate" disabled value={exchangeRate}/></p>
              </div>
              {/* <!-- convert button --> */}
            </div>
            <p><button onClick={handleConvertClicked} className="pure-button pure-button-primary">Convert</button></p>
            <p><button onClick={handleConvertClicked} className="pure-button pure-button-primary">Clear Database</button></p>
          </div>


      </div>

      {/* transaction history */}
      <div className="content-wrapper">
        <div className="content center" style={{width: '85%', margin: 'auto'}}>

          <h3 className="content-subhead is-center">Quick Stats</h3>
          <p className="is-center">Receiving all the transactions and making easy calculations on client side. Scroll down to browse transaction history.</p> 
          <QuickStats currBought="EUR" currBoughtAmount={1562} currSold="USD" currSoldAmount={489999}/>

          <h3 className="content-subhead is-center">Transaction History</h3>
          <History />
        
      </div>
    </div>   
  </div>

  );
}

export default App;
