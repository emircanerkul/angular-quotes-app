import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  username: string = "";
  password: string = "";
  cpassword: string = "";
  constructor(public afAuth: AngularFireAuth) {}

  ngOnInit() {}
  async register() {
    const { username, password, cpassword } = this;
    if (password != cpassword) {
      return console.error("Password don't match");
    }
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        username + "@quotes.app.emircanerkul.com",
        password
      );
    } catch (error) {
      console.dir(error);
    }
  }
}
