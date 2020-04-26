import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  username: string = "";
  password: string = "";
  cpassword: string = "";

  constructor(
    public loadingController: LoadingController,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  async register() {
    const loading = await this.loadingController.create({
      message: "Please wait...",
    });

    await loading.present();
    const result = await this.afAuth
      .createUserWithEmailAndPassword(
        this.username + "@quotes.app.emircanerkul.com",
        this.password
      )
      .catch((e) => {
        console.dir(e);
      })
      .finally(() => {
        this.username = this.password = this.cpassword = "";
        loading.dismiss();
      });
  }
}
