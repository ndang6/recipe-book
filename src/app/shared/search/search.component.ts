import { Component } from "@angular/core";
import { RecipeService } from "src/app/recipes/recipe.service";
import { DataStorageService } from "../data-storage.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService){}

  search(e: any){
    if(e.target.value === "") {
      this.dataStorageService.fetchRecipes().subscribe();
    }

    const recipes = this.recipeService.getRecipes()

    const updatedRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(e.target.value.toLowerCase()))
    this.recipeService.setRecipes(updatedRecipes)
  }

  onLeave(e){
    e.target.value = ""
  }
}