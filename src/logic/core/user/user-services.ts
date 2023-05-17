import { Collection } from "@/logic/firebase/db/collection";
import { User } from "./types";
import {
  Authentication,
  CancelMonitorUser,
  MonitorUser,
} from "@/logic/firebase/auth/authentication";

export class UserServices {
  private _auth = new Authentication();
  private _collection = new Collection();

  monitorAuth(observer: MonitorUser): CancelMonitorUser {
    return this._auth.monitor(async (user) => {
      observer(
        user
          ? {
              ...user,
              ...(await this.find(user.email)),
            }
          : null
      );
    });
  }

  async loginGoogle(): Promise<User | null> {
    const user = await this._auth.loginGoogle();

    if (!user) return null;

    let userFromDB = await this.find(user.email);

    if (!userFromDB) userFromDB = await this.save(user);

    return { ...user, ...userFromDB };
  }

  async logout() {
    return this._auth.logout();
  }

  async save(user: User) {
    return await this._collection.save("users", user, user.email);
  }

  private async find(email: string) {
    return await this._collection.findById("users", email);
  }
}
