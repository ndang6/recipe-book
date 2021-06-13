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
                tap(recipes => {
                    recipes = this.shuffleArray(recipes)
                }),
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

    shuffleArray = (array: Recipe[]) => {
        let m: number = array.length, t: Recipe, i: number;
      
        // While there remain elements to shuffle
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
      }
}