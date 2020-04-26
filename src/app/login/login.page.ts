import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AlertController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { async } from "rxjs/internal/scheduler/async";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private toastController: ToastController,
    public loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}
  async login() {
    const { username, password } = this;

    const loading = await this.loadingController.create({
      message: "Please wait...",
    });
    await loading.present();

    //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
    const result = await this.afAuth
      .signInWithEmailAndPassword(
        username + "@quotes.app.emircanerkul.com",
        password
      )
      .catch(async (e) => {
        if (e.code === "auth/user-not-found") {
          const alert = await this.alertController.create({
            message: "User not found",
            buttons: [
              {
                text: "Try Again",
                role: "cancel",
              },
              {
                text: "Register",
                cssClass: "secondary",
                handler: () => {
                  this.router.navigateByUrl("/register");
                },
              },
            ],
          });
          await alert.present();
        } else if (e.code === "auth/wrong-password") {
          const toast = await this.toastController.create({
            color: "danger",
            message: "Username and password not match",
            duration: 2000,
          });
          toast.present();
        } else if (e.code === "auth/user-disabled") {
          const toast = await this.toastController.create({
            color: "danger",
            message: "Account suspended!",
            duration: 2000,
          });
          toast.present();
        } else console.dir(e);
      })
      .finally(() => {
        this.username = "";
        this.password = "";
        loading.dismiss();
      });
  }
}
