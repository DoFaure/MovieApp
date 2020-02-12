import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', redirectTo: 'tabs/film', pathMatch: 'full'},
  { path: 'login',  loadChildren: () => import('./view/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register',loadChildren: () => import('./view/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'tabs', loadChildren: () =>import('./view/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'list', loadChildren: () =>import('./view/infiniteList/infiniteList.module').then(m => m.infiniteListPageModule) },
  { path: 'films', loadChildren: () =>import('./view/tabFilm/tabFilm.module').then(m => m.TabFilmPageModule) },
  { path: 'series', loadChildren: () =>import('./view/tabSerie/tabSerie.module').then(m => m.TabSeriePageModule) },
  { path: 'film-detail', loadChildren: () =>import('./view/filmDetail/filmDetail.module').then(m => m.filmDetailPageModule) },
  { path: 'serie-detail', loadChildren: () =>import('./view/serieDetail/serieDetail.module').then(m => m.SerieDetailPageModule) },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
