import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Ingredient } from "./ingredient.model"
import { ShoppingListService } from "../shopping-list/shopping-list.service"
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    fullRecipesChanged = new Subject<Recipe[]>()
    isEdited = new Subject<boolean>()

    private recipes: Recipe[] = []
    private fullRecipes: Recipe[] = []

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = JSON.parse(JSON.stringify(recipes)) // deep copy
        this.recipesChanged.next(this.recipes.slice())
    }

    setFullRecipes(recipes: Recipe[]){
        this.fullRecipes = JSON.parse(JSON.stringify(recipes))
        this.fullRecipesChanged.next(this.fullRecipes.slice())
    }

    getRecipes(){
        return this.recipes.slice() // returns a new array which is an exact copy
    }

    getFullRecipes(){
        return this.fullRecipes.slice()
    }

    getRecipeById(index: number){
        return this.recipes[index]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients)
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        console.log(this.recipes)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
        this.isEdited.next(true)
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}