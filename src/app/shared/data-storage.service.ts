import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from "rxjs/operators"

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService){}
    
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put("https://recipe-book-9d0ab-default-rtdb.firebaseio.com/recipes.json", recipes)
    }

    fetchRecipes(){
        // returns an observable - good practice
        return this.http.get<Recipe[]>("https://recipe-book-9d0ab-default-rtdb.firebaseio.com/recipes.json")
            .pipe(
                map(recipes => {
                    let index = 0
                    recipes = recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [], id: index++}
                    })
                    return recipes
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                    this.recipeService.setFullRecipes(recipes);
                })
            )
    }
}