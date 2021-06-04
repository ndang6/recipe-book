import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path: 'auth', component: AuthComponent},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '**', redirectTo: '/recipes', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // we want to use this module in app.module.ts
})
export class AppRoutingModule { }
