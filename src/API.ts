import axios, { AxiosResponse } from "axios"
import { baseUrl, transactionApi } from "./index";

const transactionUrl= "http://localhost:1337/api/transaction";

// const transactionUrl2 = `${baseUrl}${transactionApi}` || "http://localhost:1337/api/transaction";




export const getTransactions = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.get(transactionUrl);

    return transactions

  } catch (error) {
    throw new Error("Something bad happened")
  }
}