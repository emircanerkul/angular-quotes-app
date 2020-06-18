import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MemberOnlyGuard } from './guard/member-only.guard';
import { AnonymousOnlyGuard } from './guard/anonymous-only.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./page/start/start.module').then((m) => m.StartPageModule),
    canActivate: [AnonymousOnlyGuard]
  },
  {
    path: 'quotes/:filter/:param',
    loadChildren: () =>
      import('./page/quotes/quotes.module').then((m) => m.QuotesPageModule),
    canActivate: [MemberOnlyGuard]
  },
  {
    path: 'quotes/:filter',
    loadChildren: () =>
      import('./page/quotes/quotes.module').then((m) => m.QuotesPageModule),
    canActivate: [MemberOnlyGuard]
  },
  {
    path: 'quotes',
    loadChildren: () =>
      import('./page/quotes/quotes.module').then((m) => m.QuotesPageModule),
    canActivate: [MemberOnlyGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
