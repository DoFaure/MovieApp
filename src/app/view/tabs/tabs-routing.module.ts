import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'film',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabFilm/tabFilm.module').then(m => m.TabFilmPageModule)
          },
          { 
            path: 'list/:category', 
            children: [
              {
                path: '',
                loadChildren: () =>
                import('../infiniteList/infiniteList.module').then(m => m.infiniteListPageModule)
              }
            ]
          },
          { 
            path: 'film-detail/:movieID', 
            children: [
              {
                path: '',
                loadChildren: () =>
                import('../filmDetail/filmDetail.module').then(m => m.filmDetailPageModule)
              },
            ]
          },
        ]
      },
      {
        path: 'serie',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabSerie/tabSerie.module').then(m => m.TabSeriePageModule)
          },
          { 
            path: 'list/:category', 
            children: [
              {
                path: '',
                loadChildren: () =>
                import('../infiniteList/infiniteList.module').then(m => m.infiniteListPageModule)
              }
            ]
          },
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabSearch/tabSearch.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabList/tabList.module').then(m => m.Tab4PageModule)
          }
        ]
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tabProfil/tabProfil.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/film',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/film',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
