import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'tabs', redirectTo: 'tabs/film', pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login',  loadChildren: () => import('./view/login/login.module').then( m => m.LoginPageModule) },
  { path: 'register',loadChildren: () => import('./view/register/register.module').then( m => m.RegisterPageModule) },
  { path: 'tabs', loadChildren: () =>import('./view/tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard], },
  { path: 'tabs/list', loadChildren: () =>import('./view/infiniteList/infiniteList.module').then(m => m.infiniteListPageModule), canActivate: [AuthGuard] },
  { path: 'tabs/films', loadChildren: () =>import('./view/tabFilm/tabFilm.module').then(m => m.TabFilmPageModule), canActivate: [AuthGuard] },
  { path: 'tabs/series', loadChildren: () =>import('./view/tabSerie/tabSerie.module').then(m => m.TabSeriePageModule), canActivate: [AuthGuard] },
  { path: 'tabs/film/film-detail/:id', loadChildren: () =>import('./view/filmDetail/filmDetail.module').then(m => m.filmDetailPageModule), canActivate: [AuthGuard] },
  { path: 'tabs/serie/serie-detail/:id', loadChildren: () =>import('./view/serieDetail/serieDetail.module').then(m => m.SerieDetailPageModule), canActivate: [AuthGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
