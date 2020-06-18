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
import { Route, Router, ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.page.html',
  styleUrls: ['./quotes.page.scss']
})
export class QuotesPage implements OnInit {
  private key = null;
  lastInResponse: any = [];
  quotes: Quote[] = [];
  isIndexPage = false;
  isFavPage = false;
  title = 'Quotes';

  constructor(
    public modalController: ModalController,
    public auth: AuthService,
    public authorService: AuthorService,
    public afStore: AngularFirestore,
    public favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      switch (paramMap.get('filter')) {
        case null:
          this.isIndexPage = true;
          break;
        case 'top':
          this.title = 'Top Quotes';
          this.loadMore(null);
          break;
        case 'favorites':
          if (!this.isIndexPage) {
            this.isFavPage = true;
            this.title = 'My Favorite Quotes';
            this.favoriteService.quotes$.subscribe((quotes) => {
              this.quotes = [];
              if (quotes != null) {
                for (let [key, value] of Object.entries(quotes)) {
                  value['id'] = key;
                  value['fav'] = true;
                  this.quotes.push(value);
                }
              }
              this.quotes.sort((a, b) => {
                return b.created - a.created;
              });
            });
          }
          break;
        case 'author':
          let author = paramMap.get('param');
          this.title = author.toUpperCase() + "'s Quotes";
          this.authorService.getAuthorID(author).then((key) => {
            this.key = key;
            this.loadMore(null);
          });
          break;
        default:
          this.router.navigate(['quotes']);
          break;
      }
    });
  }

  loadMore(e) {
    if (this.isFavPage) {
      e.target.complete();
      e.target.disabled = true;
      return;
    }
    let authorDocRef;
    if (this.key != null)
      authorDocRef = this.afStore.collection('authors').doc(this.key).ref;

    this.afStore
      .collection('quotes', (ref) =>
        this.key == null
          ? this.lastInResponse.id == null
            ? ref.orderBy('quote').limit(8)
            : ref.orderBy('quote').startAfter(this.lastInResponse).limit(8)
          : this.lastInResponse.id == null
          ? ref.where('author', '==', authorDocRef).orderBy('quote').limit(8)
          : ref
              .where('author', '==', authorDocRef)
              .orderBy('quote')
              .startAfter(this.lastInResponse)
              .limit(8)
      )
      .snapshotChanges()
      .subscribe(
        (quotes) => {
          if (!quotes.length) {
            if (e != null) e.target.disabled = true;
            return;
          }

          this.lastInResponse = quotes[quotes.length - 1].payload.doc;
          quotes.forEach((v) => {
            this.favoriteService.isFav(v.payload.doc.id).then((fav) =>
              this.quotes.push({
                author: v.payload.doc.data()['author'].id,
                category: '1',
                id: v.payload.doc.id,
                data: v.payload.doc.data()['quote'].replace(/\.$/, ''),
                created: v.payload.doc.data()['created'].seconds * 1000,
                fav
              })
            );
          });
          if (e !== null) e.target.complete();
        },
        (error) => (e !== null ? console.log(error) : '')
      );
  }

  async profileModal() {
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass: 'dialog-modal'
    });
    await modal.present();
  }
}
