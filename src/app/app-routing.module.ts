import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page/start/start.module').then((m) => m.StartPageModule)
  },
  {
    path: 'quotes/:filter',
    loadChildren: () =>
      import('./page/quotes/quotes.module').then((m) => m.QuotesPageModule)
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./page/quotes/quotes.module').then((m) => m.QuotesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
