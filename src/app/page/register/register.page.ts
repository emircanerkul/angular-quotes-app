import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  cpassword: string = '';

  constructor(
    public auth: AuthService,
    public modalController: ModalController
  ) {}

  ngOnInit() {}
}
