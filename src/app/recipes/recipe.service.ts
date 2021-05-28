import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "./ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];
    private fullRecipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
    }

    setFullRecipes(recipes: Recipe[]){
        this.fullRecipes = recipes
    }

    getRecipes(){
        return this.recipes.slice(); // only get a copy of recipes
    }

    getFullRecipes(){
        console.log(this.fullRecipes)
        return this.fullRecipes.slice();
    }

    getRecipeById(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}