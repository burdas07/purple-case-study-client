import React, { useState } from "react";
import axios from "axios";
import { convert } from "cashify";

/** Obsolete, not being used */
const ApiOER = () => {
  
    // Open Exchange rate consts -> USD base in default
    const baseUrlOER = "http://openexchangerates.org/api/latest.json"
    const API_KEY_OER =  "18abbc2925cf4d0384b83f625045a91a";

    // useState hook for keeping the rates
    const [ratesOER, setRatesOER] = useState("");



// Open Exchange Rate
    const getLatestRatesOER = () => {

        var request = baseUrlOER + "?app_id=" + API_KEY_OER;
        console.log(request);

        axios.get(request).then((response) => {
            console.log("Open Exchange Rate API Call");
            console.log(response);
            console.log(response.data.rates);
            setRatesOER(JSON.stringify(response.data.rates, null, 2));

            // Read data structure test
            console.log("1 US Dollar equals " + response.data.rates.GBP + " British Pounds");

            // Cashify Test
            var rates = response.data.rates;
            console.log("Let's make a cashify test, 10 EUR to GBP ");
            console.log(convert(10, {from: 'EUR', to: 'GBP', base: 'USD', rates}));
        })
    }

    return (
        <div className="App">
        <p><button onClick={getLatestRatesOER}>Get Rates OER</button></p>
        {ratesOER}
        </div>
    );
}

export default ApiOER;