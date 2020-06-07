import { Component, OnInit, ViewChild } from '@angular/core';
import { Quote } from './quote.module';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss']
})
export class QuotesPage implements OnInit {
  lastInResponse: any = [];
  quotes: Quote[] = [];

  constructor(
    public modalController: ModalController,
    public auth: AuthService,
    public afStore: AngularFirestore
  ) {
    this.afStore
      .collection('quotes', (ref) => ref.orderBy('quote').limit(14))
      .snapshotChanges()
      .subscribe((quotes) => {
        this.lastInResponse = quotes[quotes.length - 1].payload.doc;
        quotes.forEach((v) => {
          this.quotes.push({
            author: '1',
            category: 1,
            id: 1,
            title: v.payload.doc.data()['quote']
          });
        });
      });
  }

  loadMore(e) {
    this.afStore
      .collection('quotes', (ref) =>
        ref.orderBy('quote').startAfter(this.lastInResponse).limit(14)
      )
      .snapshotChanges()
      .subscribe(
        (quotes) => {
          if (!quotes.length) {
            e.target.disabled = true;
            return;
          }

          this.lastInResponse = quotes[quotes.length - 1].payload.doc;
          quotes.forEach((v) => {
            this.quotes.push({
              author: '1',
              category: 1,
              id: 1,
              title: v.payload.doc.data()['quote']
            });
          });

          e.target.complete();
        },
        (error) => (e.target.disabled = true)
      );
  }

  async login() {
    const modal = await this.modalController.create({
      component: LoginPage,
      cssClass: 'dialog-modal'
    });
    await modal.present();
    modal.onDidDismiss().then((r) => {
      if (r.data == 'register') this.register();
    });
  }

  async register() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      cssClass: 'dialog-modal'
    });
    await modal.present();
  }

  ngOnInit() {}
}
