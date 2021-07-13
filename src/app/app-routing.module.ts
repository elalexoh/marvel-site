import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importo las rutas
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [

  {
    path: "",
    component: PruebaComponent,
  },
  { path: 'comic', loadChildren: () => import('./comic/comic.module').then(m => m.ComicModule) },
  { path: 'comics', loadChildren: () => import('./comics/comics.module').then(m => m.ComicsModule) },
  { path: 'characters', loadChildren: () => import('./characters/characters.module').then(m => m.CharactersModule) },
  { path: 'creators', loadChildren: () => import('./creators/creators.module').then(m => m.CreatorsModule) },
  { path: 'series', loadChildren: () => import('./series/series.module').then(m => m.SeriesModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // const prueba = 'hey'
}
