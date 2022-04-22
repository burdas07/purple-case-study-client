import React, { useState } from "react";
import axios from "axios";
import { convert } from "cashify";

/** Obsolete, not being used */
const ApiFixer = () => {
    
    // Fixer consts -> EUR Base in default
    const baseUrlFixer = "http://data.fixer.io/api/latest";
    const API_KEY_FIXER = "097cd31d6a3fd259bc62cac11e08e5d1";

    // useState hook for keeping the rates
    const [ratesFixer, setRatesFixer] = useState("");

      // Fixer
    const getLatestRatesFixer = () => {

        var request = baseUrlFixer + "?access_key=" + API_KEY_FIXER;
        console.log(request);

        axios.get(request).then((response) => {
        console.log("Fixer API Call");
        console.log(response);
        console.log(response.data.rates);
        setRatesFixer(JSON.stringify(response.data.rates, null, 2));

        // Cashify Test
        var rates = response.data.rates;
        console.log("Let's make a cashify test, 10 EUR to GBP ");
        console.log(convert(10, {from: 'EUR', to: 'GBP', base: 'EUR', rates}));
        })
    }
     
  return (
    <div className="App">
        <p><button onClick={getLatestRatesFixer}>Get Rates Fixer</button></p>
        {ratesFixer}
    </div>
  );
}

export default ApiFixer;
