import { Component, OnInit, ViewChild } from "@angular/core";
import { Quote } from "./quote.module";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { UserService } from "src/app/service/auth/user.service";
import { LoginPage } from "../login/login.page";
import { RegisterPage } from "../register/register.page";

@Component({
  selector: "app-quotes",
  templateUrl: "./quotes.page.html",
  styleUrls: ["./quotes.page.scss"],
})
export class QuotesPage implements OnInit {
  page = 0;
  quotes: Quote[] = [];

  constructor(
    public user: UserService,
    public modalController: ModalController
  ) {
    this.loadQuotes();
  }

  loadQuotes() {
    //
  }

  loadMore(e) {
    this.page++;
    this.loadQuotes();
    if (this.page === 3) e.target.disabled = true;
  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: "dialog-modal",
    });
    await modal.present();
    modal.onDidDismiss().then((r) => {
      if (r.data == "register") this.register();
    });
  }

  async register() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: "dialog-modal",
    });
    await modal.present();
  }

  ngOnInit() {}
}
