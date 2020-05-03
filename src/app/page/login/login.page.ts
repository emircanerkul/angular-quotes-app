import { Component, OnInit, NgModule } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AlertController,
  ToastController,
  LoadingController,
  ModalController,
} from "@ionic/angular";
import { AuthService } from "src/app/service/auth/auth.service";

export class HomePageModule {}
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public username: string = "";
  public password: string = "";

  constructor(
    public auth: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async close() {
    await this.modalController.dismiss();
  }
}
