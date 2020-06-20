import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuotesPageRoutingModule } from './quotes-routing.module';

import { QuotesPage } from './quotes.page';
import { ProfilePageModule } from '../profile/profile.module';
import { AuthorService } from 'src/app/service/author/author.service';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { DEFAULTS } from '@angular/fire/remote-config';
import { SETTINGS } from '@angular/fire/remote-config';
import { MainModule } from 'src/app/modules/main/main.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainModule,
    QuotesPageRoutingModule,
    ProfilePageModule,
    AngularFireRemoteConfigModule
  ],
  declarations: [QuotesPage],
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
