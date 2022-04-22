interface ITransaction {
    _id: string
    from: string;
    to: string;
    amount: number;
    result: number;
    createdAt?: string
    updatedAt?: string
  }
  
  interface TransactionProps {
    transactions: ITransaction[]
  }
  
  type ApiDataType = {
    message: string
    status: string
    transactions: ITransaction[]
    transaction?: ITransaction
  }

// conversion result
interface IConvertResult {
    amount: number,
    from: string
    message: string,
    result: number,
    to: string
  }