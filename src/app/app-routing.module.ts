import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'auth', component: AuthComponent},
  {path: 'home', component: HomeComponent},
  // {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // we want to use this module in app.module.ts
})
export class AppRoutingModule { }
