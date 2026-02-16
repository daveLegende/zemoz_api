import { TransactionType } from "src/transactions/domain/transaction.enum";
import { Admin } from "typeorm";
import { User } from "user/domain";

export interface ICreateTransactionDTO {
  
  type: TransactionType;

  amount: number;

  frais?: number;

  phone: string;

  user?: string;

  admin?: string;
}

export interface ICreatePassDTO {
  
  pass: string;
}


export interface IUpdateTransactionDTO extends Partial<ICreateTransactionDTO> {
  id: string;
}


export interface IUpdatePassDTO extends Partial<ICreatePassDTO> {
  id: string;
}
