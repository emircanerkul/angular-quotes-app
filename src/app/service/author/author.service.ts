import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  ready = false;
  authors = [];

  constructor(public afStore: AngularFirestore) {
    this.afStore
      .collection('authors')
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((authors) => {
        authors.forEach((v) => {
          this.authors[v.payload.doc.id] = v.payload.doc.data()['name'];
        });
        this.ready = true;
      });
  }

  public getAuthor(id: string): string {
    return this.authors[id];
  }
}
