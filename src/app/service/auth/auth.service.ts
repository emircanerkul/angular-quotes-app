import { Injectable, Input } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { User } from "./user.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { auth } from "firebase";
import { AngularFirestoreDocument } from "@angular/fire/firestore/public_api";
import {
  AlertController,
  ToastController,
  LoadingController,
  ModalController,
} from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user)
          return this.afStore.doc<User>(`users/${user.uid}`).valueChanges();
        else return of(null);
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    if (credential.user) {
      this.updateUserData(credential.user);
      this.modalController.dismiss();
      this.router.navigate(["/profile"]);
    }
    return this.updateUserData(credential.user);
  }

  async emailSignin(username: string, password: string) {
    const email = username.split("@")[0];

    const loading = await this.loadingController.create({
      message: "Please wait...",
    });
    await loading.present();

    const credential = <firebase.auth.UserCredential>await this.afAuth
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
        // this.username = "";
        // this.password = "";
        loading.dismiss();
      });

    if (credential.user) {
      this.updateUserData(credential.user);

      this.modalController.dismiss();
      this.router.navigate(["/profile"]);
    }
  }

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
  async emailRegister(username: string, password: string) {
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
            // this.username = "";
            const toast = await this.toastController.create({
              color: "danger",
              message: "User already exist. Please try with diferent username.",
              duration: 3000,
            });
            toast.present();
          } else if (e.code === "auth/weak-password") {
            // this.password = this.cpassword = "";
            const toast = await this.toastController.create({
              color: "danger",
              message: "Password isn't strong enough",
              duration: 2000,
            });
            toast.present();
          } else {
            console.dir(e);
            // this.username = this.password = this.cpassword = "";
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
          description: "",
          color: "",
        })
        .catch((e) => {
          console.log(e);
          this.presentAlert(
            "Error",
            "Unidentified error occurred. Please try again later.",
            () => {
              //this.username = this.password = this.cpassword = "";
            }
          ).then(() => loading.dismiss());
          return;
        })
        .finally(() => {
          loading.dismiss();

          /*  this.user.setUser({
            uid: result.user.uid,
            email: "",
            description: null,
            color: null,
          }); */

          this.presentAlert("Welcome", "You are registered!", () =>
            this.router.navigate(["/profile"])
          );
        });
    }
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(["/"]);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afStore.doc(
      `users/${uid}`
    );

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      description: null,
      color: null,
    };

    return userRef.set(data, { merge: true });
  }
}
