import { TransactionServices } from "./transaction/transaction-services";
import { UserServices } from "./user/user-services";

class Services {
  get transaction() {
    return new TransactionServices();
  }
  get user() {
    return new UserServices();
  }
}

export const services = new Services();
