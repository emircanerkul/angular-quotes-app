import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "src/app/service/auth/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(private afStore: AngularFirestore, public auth: AuthService) {}

  ngOnInit() {}
}
