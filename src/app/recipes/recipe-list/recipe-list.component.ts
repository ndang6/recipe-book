import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  subscription: Subscription;
  error: string = null;

  dessertOnly: boolean = false;
  mainOnly: boolean = false;

  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewRecipe(){
    this.dessertOnly = false;
    this.mainOnly = false;
    this.recipeService.setRecipes(this.recipeService.getFullRecipes())
    
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  getRecipes(){
    this.dessertOnly = false;
    this.mainOnly = false;

    this.recipeService.setRecipes(this.recipeService.getFullRecipes())
    this.router.navigate(['recipes'])
  }

  onSaveData(){
    if( (this.authService.user.value.email === "admin@test.com") || (this.authService.user.value.email === "maica59aimable@gmail.com") ){
        this.dataStorageService.storeRecipes();
        this.error = "Save successfully"
    }
    else{
        this.error = "Sorry! You don't have the permission to save recipes."
    }
  }

  onHandleError(){
    this.error = null;
  } 
}
