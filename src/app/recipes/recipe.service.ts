import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { Recipe } from "./recipe.model"

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>()
    fullRecipesChanged = new Subject<Recipe[]>()
    isEdited = new Subject<boolean>()

    private recipes: Recipe[] = []
    private fullRecipes: Recipe[] = []

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes
        this.recipesChanged.next(this.recipes.slice())
    }

    setFullRecipes(recipes: Recipe[]){
        this.fullRecipes = recipes
        this.fullRecipesChanged.next(this.fullRecipes.slice())
    }

    getRecipes(){ return this.recipes.slice() }

    getFullRecipes(){ return this.fullRecipes.slice() }

    getRecipeById(index: number){ return this.recipes[index] }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number, newRecipe: Recipe){
        newRecipe.id = this.recipes[index].id
        this.recipes[index] = newRecipe
        this.recipesChanged.next(this.recipes.slice())
        this.isEdited.next(true)
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1)
        this.recipesChanged.next(this.recipes.slice())
    }
}