import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
import { NetworkService } from 'src/app/service/network/network.service';
import { Observable } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { Quote } from '../quotes/quote.module';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { AuthorService } from 'src/app/service/author/author.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss']
})
export class StartPage implements OnInit {
  featuredQuotes = [
    {
      quote:
        'If I have seen further it is by standing on the shoulders of Giants.',
      author: 'Isaac Newton',
      img: 'assets/img/newton.png'
    },
    {
      quote: 'As soon as you trust yourself, you will know how to live.',
      author: 'Johann Wolfgang von Goethe',
      img: 'assets/img/goethe.png'
    },
    {
      quote:
        'Nothing in this world is harder than speaking the truth, nothing easier than flattery.',
      author: 'Fyodor Dostoevsky',
      img: 'assets/img/dostoevsky.png'
    }
  ];
  favoriteQuotes: Quote[] = [];

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    public network: NetworkService,
    public authorService: AuthorService,
    private modalController: ModalController,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.favoriteService.quotes$.subscribe((quotes) => {
      this.favoriteQuotes = [];
      if (quotes != null) {
        for (let [key, value] of Object.entries(quotes)) {
          value['id'] = key;
          value['fav'] = true;
          this.favoriteQuotes.push(value);
        }
      }
      this.favoriteQuotes.sort((a, b) => {
        return b.created - a.created;
      });
    });
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
    modal.onDidDismiss().then((r) => {
      if (r.data == 'login') this.login();
    });
  }
}
