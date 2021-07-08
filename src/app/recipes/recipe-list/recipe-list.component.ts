import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { faIceCream, faUtensils, faQuestion, faToggleOn, faToggleOff, faInfo } from '@fortawesome/free-solid-svg-icons';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  faIceCream = faIceCream; faUtensils = faUtensils; faQuestion = faQuestion; faToggleOn = faToggleOn; faToggleOff = faToggleOff; faInfo = faInfo

  pagination: boolean = false; categorySelected: string = ''; nameSelected: string = ''

  recipes: Recipe[]
  fullRecipes: Recipe[]

  numOfDesserts: number = 0
  isAdmin: boolean = false
  isEdited: boolean = false

  recipesSub: Subscription
  fullRecipesSub: Subscription
  isEditedSub: Subscription

  isLoading: boolean = false; isSearching: boolean = false
  error: string = null
  currentPage: number = 1; itemsPerPage: number = 6

  constructor(
    private recipeService: RecipeService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoading = true
    this.isAdmin = (this.authService.user.value.email === "admin@test.com") || (this.authService.user.value.email === "maica59aimable@gmail.com")

    this.recipesSub = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
          this.recipes = recipes
          for(let recipe of this.recipes){ if(recipe.category === 'dessert') this.numOfDesserts += 1}
          this.isLoading = false
    })
    this.fullRecipesSub = this.recipeService.fullRecipesChanged.subscribe((recipes: Recipe[]) => this.fullRecipes = recipes)
    this.isEditedSub = this.recipeService.isEdited.subscribe((value: boolean) => this.isEdited = value)
  }

  diff(array1: Recipe[], array2: Recipe[]){
    return ( (array1.length !== array2.length) || this.isEdited)
  }

  onNewRecipe(){ this.router.navigate(['new'], {relativeTo: this.route}) }

  onShowJSON(){ this.router.navigate(['json'], {relativeTo: this.route}) }

  getRecipes(){
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
    if(event.target.value.length == 0){
      this.isSearching = false
      return;
    }

    this.isSearching = true
    this.currentPage = 1   
    this.nameSelected = event.target.value
  }

  onClear(searchInput: any){
    this.isSearching = false
    this.nameSelected = ''
    searchInput.value = ''
  }

  drop(event: CdkDragDrop<Recipe[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  togglePagination() {
    this.pagination = !this.pagination
    this.getRecipes()
  }

  ngOnDestroy(){
    this.recipesSub.unsubscribe();
    this.fullRecipesSub.unsubscribe();
    this.isEditedSub.unsubscribe();
  }
}
