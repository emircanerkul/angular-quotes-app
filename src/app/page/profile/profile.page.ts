import { Component, OnInit, isDevMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';
import { IonInput, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  isDevMode: boolean;
  onDescriptionEdit: boolean = false;
  descriptionSnapshot: string;
  maxLength: number = 60;

  constructor(
    public auth: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.isDevMode = isDevMode();
  }

  editDescription(input: IonInput) {
    if (!this.onDescriptionEdit) {
      this.descriptionSnapshot = input.value.toString();
      this.onDescriptionEdit = true;
    }
  }

  cancelEditDescription(input: IonInput, saved: boolean = false) {
    input.getInputElement().then((element) => {
      this.onDescriptionEdit = false;
      if (!saved) input.value = this.descriptionSnapshot;
      element.blur();
    });
  }

  saveDescription(input: IonInput) {
    if (input.value.toString().length > this.maxLength) {
      this.toastController
        .create({
          message: 'Description must be less or equal than 60 character.',
          duration: 2000,
          color: 'danger'
        })
        .then((e) => {
          e.present();
          input.setFocus();
        });
      return;
    } else if (input.value.toString() == this.descriptionSnapshot) {
      this.toastController
        .create({
          message: 'There are no changes.',
          duration: 1000
        })
        .then((e) => e.present());
    }
    this.auth
      .changeProfileDescription(input.value.toString())
      .then(() => this.cancelEditDescription(input, true))
      .catch((e) => {
        this.toastController
          .create({
            message: 'Error occurred. Please try later.',
            duration: 3000,
            color: 'danger'
          })
          .then((e) => {
            e.present();
            input.value = this.descriptionSnapshot;
          });
      });
  }
}
