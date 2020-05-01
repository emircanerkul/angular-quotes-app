import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "quotes",
    pathMatch: "full",
  },
  {
    path: "quotes",
    loadChildren: () =>
      import("./page/quotes/quotes.module").then((m) => m.QuotesPageModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./page/profile/profile.module").then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
