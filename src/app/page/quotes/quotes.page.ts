import { Component, OnInit, ViewChild } from '@angular/core';
import { Quote } from './quote.module';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfilePage } from '../profile/profile.page';
import { exit } from 'process';
import { AuthorService } from 'src/app/service/author/author.service';

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
    public authorService: AuthorService,
    public afStore: AngularFirestore
  ) {
    this.loadMore(null);
  }

  loadMore(e) {
    this.afStore
      .collection('quotes', (ref) =>
        this.lastInResponse[0] == undefined
          ? ref.orderBy('quote').limit(14)
          : ref.orderBy('quote').startAfter(this.lastInResponse).limit(14)
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
              author: v.payload.doc.data()['author'].id,
              category: '1',
              id: v.payload.doc.id,
              title: v.payload.doc.data()['quote'],
              created: v.payload.doc.data()['created'].seconds * 1000
            });
          });
          if (e !== null) e.target.complete();
        },
        (error) => (e !== null ? (e.target.disabled = true) : '')
      );
  }

  async profileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass: 'dialog-modal'
    });
    await modal.present();
  }

  ngOnInit() {}
}
