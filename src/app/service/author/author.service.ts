import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take, shareReplay, share } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private _authors$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  authorNames$: Subject<string[]> = new Subject();

  constructor(public afStore: AngularFirestore) {
    this.afStore
      .collection('authors')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((authors) => {
        let tmp = [];
        let tmp2 = [];

        authors.forEach((v) => {
          tmp[v.payload.doc.id] = v.payload.doc.data()['name'];
          tmp2.push(v.payload.doc.data()['name']);
        });

        this._authors$.next(tmp);
        this.authorNames$.next(tmp2);
      });
  }

  get authors$() {
    return this._authors$.asObservable();
  }

  public async getAuthorName(id: string): Promise<string> {
    return new Promise((resolutionFunc, rejectionFunc) => {
      this.authors$.pipe(take(2)).subscribe((val) => {
        if (val != null) {
          resolutionFunc(this._authors$.value[id]);
        }
      });
    });
  }

  public async getAuthorID(name: string): Promise<string> {
    return new Promise((resolutionFunc, rejectionFunc) => {
      this.authors$.pipe(take(2)).subscribe((val) => {
        if (val != null) {
          resolutionFunc(this.getKeyByValue(val, name));
        }
      });
    });
  }

  private getKeyByValue(array, value: string) {
    for (var prop in array) {
      if (array.hasOwnProperty(prop)) {
        if (array[prop].toLowerCase() === value) return prop;
      }
    }
  }
}
