import { Collection } from "@/logic/firebase/db/collection";
import { Transaction } from "./type";
import { User } from "../user/types";
import { FormatDate } from "@/logic/utils/date";

export class TransactionServices {
  private _collection = new Collection();

  async save(transaction: Transaction, user: User) {
    return this._collection.save(
      `finances/${user.email}/transactions`,
      transaction
    );
  }

  async findAll(user: User) {
    const path = `finances/${user.email}/transactions`;

    return await this._collection.findAll(path, "date", "asc");
  }

  async findAllByMonth(user: User, date: Date) {
    const path = `finances/${user.email}/transactions`;

    return await this._collection.findAllWithFilter(path, [
      { attribute: "date", op: ">=", value: FormatDate.firstDay(date) },
      { attribute: "date", op: "<=", value: FormatDate.lastDay(date) },
    ]);
  }

  async remove(transaction: Transaction, user: User) {
    return this._collection.remove(
      `finances/${user.email}/transactions`,
      transaction.id
    );
  }
}
