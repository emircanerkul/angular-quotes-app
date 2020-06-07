import { Component, OnInit, isDevMode } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/service/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  isDevMode: boolean;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.isDevMode = isDevMode();
  }
}
