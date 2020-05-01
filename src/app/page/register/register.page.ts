import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  LoadingController,
  AlertController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { UserService } from "src/app/service/auth/user.service";
import { Router } from "@angular/router";

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
    private user: UserService,
    private modalController: ModalController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {}

  async presentAlert(title: string, content: string, handler = undefined) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [
        {
          text: "Okay",
          handler,
        },
      ],
    });
    await alert.present();
  }

  async register() {
    const { username, password, cpassword } = this;
    const loading = await this.loadingController.create({
      message: "Please wait...",
    });
    await loading.present();

    const result = <firebase.auth.UserCredential>(
      await this.afAuth
        .createUserWithEmailAndPassword(
          username + "@quotes.app.emircanerkul.com",
          password
        )
        .catch(async (e) => {
          loading.dismiss();
          if (e.code === "auth/email-already-in-use") {
            this.username = "";
            const toast = await this.toastController.create({
              color: "danger",
              message: "User already exist. Please try with diferent username.",
              duration: 3000,
            });
            toast.present();
          } else if (e.code === "auth/weak-password") {
            this.password = this.cpassword = "";
            const toast = await this.toastController.create({
              color: "danger",
              message: "Password isn't strong enough",
              duration: 2000,
            });
            toast.present();
          } else {
            console.dir(e);
            this.username = this.password = this.cpassword = "";
            const toast = await this.toastController.create({
              color: "danger",
              message: "Unidentified error occurred. Please try again later.",
              duration: 2000,
            });
            toast.present().then(() => this.modalController.dismiss());
          }
          return;
        })
    );

    if (result && result.user) {
      this.afStore
        .doc(`users/${result.user.uid}`)
        .set({
          username,
          description: "",
          color: "",
        })
        .catch((e) => {
          console.log(e);
          this.presentAlert(
            "Error",
            "Unidentified error occurred. Please try again later.",
            () => {
              this.username = this.password = this.cpassword = "";
            }
          ).then(() => loading.dismiss());
          return;
        })
        .finally(() => {
          loading.dismiss();

          this.user.setUser({
            time: Date.now(),
            uid: result.user.uid,
            username,
            description: undefined,
            color: undefined,
          });

          this.presentAlert("Welcome", "You are registered!", () =>
            this.router.navigate(["/profile"])
          );
        });
    }
  }

  async close() {
    await this.modalController.dismiss();
  }
}
