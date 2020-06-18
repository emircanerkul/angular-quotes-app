import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesPageRoutingModule } from './quotes-routing.module';

import { QuotesPage } from './quotes.page';
import { ProfilePage } from '../profile/profile.page';
import { ProfilePageModule } from '../profile/profile.module';
import { AuthorPipe } from 'src/app/pipe/author/author.pipe';
import { AuthorService } from 'src/app/service/author/author.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { DEFAULTS } from '@angular/fire/remote-config';
import { SETTINGS } from '@angular/fire/remote-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesPageRoutingModule,
    ProfilePageModule,
    AngularFireRemoteConfigModule
  ],
  declarations: [QuotesPage, AuthorPipe, TimeAgoPipe],
  providers: [
    AuthorService,
    FavoriteService,
    {
      provide: DEFAULTS,
      useValue: {
        QUOTE_OF_THE_DAY:
          '{"author":"st26YGhNAxXdo7J8ku93","category":"1","data":"If I have seen further it is by standing on the shoulders of Giants.","created":1592475583561}'
      }
    },
    {
      provide: SETTINGS,
      useFactory: () =>
        isDevMode() ? { minimumFetchIntervalMillis: 10000 } : {}
    }
  ]
})
export class QuotesPageModule {}
