import { Component, OnInit, NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AlertController,
  ToastController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../../service/auth/user.service";
import { RegisterPage } from "../register/register.page";

export class HomePageModule {}
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(
    private user: UserService,
    private modalController: ModalController,
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
    const result = <firebase.auth.UserCredential>await this.afAuth
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
                handler: async () => {
                  this.modalController.dismiss("register");
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

    if (result.user) {
      this.user.setUser({
        time: Date.now(),
        uid: result.user.uid,
        username,
        description: undefined,
        color: undefined,
      });

      this.modalController.dismiss();
      this.router.navigate(["/profile"]);
    }
  }

  async close() {
    await this.modalController.dismiss();
  }
}
