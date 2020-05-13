import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { QuotesPageRoutingModule } from "./quotes-routing.module";

import { QuotesPage } from "./quotes.page";
import { NavigationComponent } from "src/app/component/navigation/navigation.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, QuotesPageRoutingModule],
  declarations: [QuotesPage, NavigationComponent],
})
export class QuotesPageModule {}
