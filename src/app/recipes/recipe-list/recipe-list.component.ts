import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { faIceCream, faUtensils, faQuestion } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  faIceCream = faIceCream
  faUtensils = faUtensils
  faQuestion = faQuestion

  categorySelected: string = ''
  nameSelected: string = ''

  recipes: Recipe[]
  fullRecipes: Recipe[]
  shortRecipes: Object[]
  numOfDesserts: number
  isAdmin: boolean = false
  isEdited: boolean = false

  recipesSubscription: Subscription
  fullRecipesSubscription: Subscription
  isEditedSubscription: Subscription

  isLoading = false
  error: string = null
  currentPage: number = 1
  itemsPerPage: number = 6

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.isAdmin = (this.authService.user.value.email === "admin@test.com") || (this.authService.user.value.email === "maica59aimable@gmail.com")

    this.recipesSubscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes
        this.numOfDesserts = 0
        for(let recipe of this.recipes){
          if(recipe.category === 'dessert') this.numOfDesserts += 1
        }

        this.isLoading = false
      }
    );

    this.fullRecipesSubscription = this.recipeService.fullRecipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.fullRecipes = recipes
      }
    );

    this.isEditedSubscription = this.recipeService.isEdited.subscribe((value: boolean) => this.isEdited = value)
  }

  diff(array1: Recipe[], array2: Recipe[]){
    if( (array1.length !== array2.length) || this.isEdited) return true
    return false
  }

  getShortRecipes(){
    this.shortRecipes = this.recipes.map(recipe => {return {'name': recipe.name, 'ingredients': recipe.ingredients, 'instructions': recipe.instructions}})
  }

  ngOnDestroy(){
    this.recipesSubscription.unsubscribe();
    this.fullRecipesSubscription.unsubscribe();
    this.isEditedSubscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onShowJSON(){
    this.router.navigate(['json'], {relativeTo: this.route})
  }

  getRecipes(){
    this.recipeService.setRecipes(this.recipeService.getFullRecipes())
    this.categorySelected = ''
    this.currentPage = 1

    this.recipeService.isEdited.next(false)
    this.router.navigate(['/recipes'])
  }

  onSaveData(){
    if(this.isAdmin){
      this.error = "Save successfully!"
      this.dataStorageService.storeRecipes().subscribe()   
    }
    else
      this.error = "Sorry! You don't have the permission to save recipes."
  }

  onClose(){
    this.recipeService.isEdited.next(false)
    this.recipeService.setFullRecipes(this.recipes)
    this.error = null
    this.router.navigate(['/recipes'])
  }
  
  onSelectCategory(value: string){
    this.currentPage = 1
    this.categorySelected = value
  }

  onSelectRandom(){
    this.getRecipes()

    const randomNum = Math.round(Math.random() * (this.recipes.length-1) )
    this.currentPage = (Math.floor((randomNum / this.itemsPerPage)) + 1)

    this.router.navigate([`/recipes/${randomNum}`], {relativeTo: this.route})
  }

  search(event: any){
    this.currentPage = 1   
    this.nameSelected = event.target.value
  }
}
