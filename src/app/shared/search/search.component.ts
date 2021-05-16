import { Component } from "@angular/core";
import { RecipeService } from "src/app/recipes/recipe.service";
import { DataStorageService } from "../data-storage.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  isEmpty: boolean = true;

  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService){}

  search(e: any){
    if(e.target.value === "") {
      this.isEmpty = true;
      this.dataStorageService.fetchRecipes().subscribe();
    }

    this.isEmpty = false;
    if(e.target.value.length < 3) return;

    this.dataStorageService.fetchRecipes().subscribe(data => {
      this.recipeService.setRecipes(data.filter(recipe => recipe.name.toLowerCase().includes(e.target.value.toLowerCase())))
    });
  }

  onLeave(e){
    e.target.value = ""
    this.isEmpty = true
    this.dataStorageService.fetchRecipes().subscribe();
  }
}