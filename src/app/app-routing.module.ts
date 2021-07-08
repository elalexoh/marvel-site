import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Importo las rutas
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [
  {
    path: 'prueba', component: PruebaComponent //nueva ruta sin lazy loading
  },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
