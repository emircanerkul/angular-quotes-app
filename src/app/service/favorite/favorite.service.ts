import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Quote } from 'src/app/page/quotes/quote.module';
import { IonIcon, IonItemSliding } from '@ionic/angular';
import { from, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private _quotes$: BehaviorSubject<Quote[]> = new BehaviorSubject(null);

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      let tmp: Quote[] = [];
      storage
        .forEach((data: string, id: string) => {
          tmp[id] = JSON.parse(data);
        })
        .then(() => {
          this._quotes$.next(tmp);
        });
    });
  }

  get quotes$() {
    return this._quotes$.asObservable();
  }

  favorite(data: Quote, ionIcon: IonIcon, slide: IonItemSliding) {
    let quote = { ...data };
    let id = quote.id;
    delete quote.id;
    delete quote.fav;
    quote.created = Date.now();

    this.quotes$.pipe(take(1)).subscribe((quotes) => {
      if (quotes[id] == null) {
        quotes[id] = quote;
        this.storage.set(id, JSON.stringify(quote)).then(() => {
          ionIcon.name = 'heart-dislike-outline';
          this._quotes$.next(quotes);
          slide.close();
        });
      } else {
        delete quotes[id];
        this.storage.remove(id).then(() => {
          ionIcon.name = 'heart';
          this._quotes$.next(quotes);
          slide.close();
        });
      }
    });
  }

  isFav(id: string): Promise<boolean> {
    return new Promise((resolutionFunc, rejectionFunc) => {
      this.quotes$.pipe(take(2)).subscribe((quotes) => {
        if (quotes != null) resolutionFunc(quotes[id] != null);
      });
    });
  }
}
