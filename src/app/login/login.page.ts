import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AlertController, ToastController } from "@ionic/angular";
import { Router } from "@angular/router";

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
    private router: Router
  ) {}

  ngOnInit() {}
  async login() {
    const { username, password } = this;
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        username + "@quotes.app.emircanerkul.com",
        password
      );
    } catch (err) {
      if (err.code === "auth/user-not-found") {
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
      } else if (err.code === "auth/wrong-password") {
        const toast = await this.toastController.create({
          color: "danger",
          message: "Username and password not match",
          duration: 2000,
        });
        toast.present();
      } else console.dir(err);

      this.username = "";
      this.password = "";
    }
  }
}
