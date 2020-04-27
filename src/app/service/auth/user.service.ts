import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private user: User;
  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUID() {
    return this.user.uid;
  }

  getUsername() {
    return this.user.username;
  }

  getProfile() {
    return "https://api.adorable.io/avatars/face/eyes1";
  }

  isAvailable() {
    return this.user;
  }
}
