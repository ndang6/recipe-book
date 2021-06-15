import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RecipeJsonComponent } from './recipe-json/recipe-json.component' 
import { CategoryFilterPipe } from "./recipe-list/categoryFilter.pipe";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NameFilterPipe } from "./recipe-list/nameFilter.pipe";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEditComponent,
    RecipeJsonComponent,
    CategoryFilterPipe,
    NameFilterPipe
  ],
  imports: [
    RouterModule, 
    ReactiveFormsModule, 
    RecipesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    DragDropModule
  ],
})
export class RecipesModule {}