import { NgModule } from '@angular/core';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuotesPageRoutingModule,
    ProfilePageModule
  ],
  declarations: [QuotesPage, AuthorPipe, TimeAgoPipe],
  providers: [AuthorService, FavoriteService]
})
export class QuotesPageModule {}
