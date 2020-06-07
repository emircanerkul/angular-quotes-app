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
    'ion-avatar {margin: 10px auto; width: 96px; height: 96px;}',
    'div {text-align: center}',
    'ion-label {font-size: 16pt;}',
    'ion-text {display: block; font-size: 10pt; background-color: #00000080; padding: 10px; margin: 10px 10px 0; border-radius: 15px;}'
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
