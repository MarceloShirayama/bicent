import { User } from "@/logic/core/user/types";
import {
  Auth,
  User as FirebaseUser,
  GoogleAuthProvider,
  getAuth,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../config/app";

export type MonitorUser = (user: User | null) => void;

export type CancelMonitorUser = () => void;

export class Authentication {
  private _auth: Auth;

  constructor() {
    this._auth = getAuth(app);
  }

  async loginGoogle(): Promise<User | null> {
    const resp = await signInWithPopup(this._auth, new GoogleAuthProvider());

    return this.convertToAppUser(resp.user);
  }

  async logout() {
    return signOut;
  }

  monitor(notify: MonitorUser): CancelMonitorUser {
    return onIdTokenChanged(this._auth, async (firebaseUser) => {
      const user = this.convertToAppUser(firebaseUser);
      notify(user);
    });
  }

  private convertToAppUser(firebaseUser: FirebaseUser | null): User | null {
    if (!firebaseUser?.email) return null;

    const alternativeName = firebaseUser.email.split("@")[0];

    return {
      id: firebaseUser.uid,
      name: firebaseUser.displayName ?? alternativeName,
      email: firebaseUser.email,
      imageUrl: firebaseUser.photoURL,
    };
  }
}
