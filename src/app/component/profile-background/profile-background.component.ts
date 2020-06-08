import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ColorModule } from 'src/app/modules/color/color.module';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile-background',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './profile-background.component.html',
  styles: [
    'app-profile-background ion-avatar {margin: 10px auto; width: 96px; height: 96px;}',
    'app-profile-background div {text-align: center}',
    'app-profile-background ion-label {font-size: 16pt;}',
    'app-profile-background ion-input {font-size: 10pt!important; background-color: #00000080!important; margin: 10px 0; border-radius: 15px; --padding-end: 10px!important;}',
    'app-profile-background ion-chip {margin-top: 10px;background-color: #00000080;color: white;height: 35px;}'
  ]
})
export class ProfileBackgroundComponent {
  @Input() color;
  constructor(
    public colorModule: ColorModule,
    private auth: AuthService,
    private afStore: AngularFirestore,
    private toastController: ToastController
  ) {}
  refreshBackgroundColor() {
    this.auth.user$.pipe(take(1)).subscribe((e) => {
      this.afStore
        .doc(`users/${e.uid}`)
        .update({
          color: this.colorModule.getRandomColor()
        })
        .catch((e) => {
          console.log(e);
          return;
        })
        .finally(() => {
          this.toastController.create({
            message: 'Background Changed!'
          });
        });
    });
    return;
  }
}
