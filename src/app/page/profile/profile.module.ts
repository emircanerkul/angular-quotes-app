import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileBackgroundComponent } from 'src/app/component/profile-background/profile-background.component';
import { ColorModule } from 'src/app/modules/color/color.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ColorModule
  ],
  declarations: [ProfilePage, ProfileBackgroundComponent]
})
export class ProfilePageModule {}
