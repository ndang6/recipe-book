import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { saveAs } from "file-saver-es";
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-json',
  templateUrl: './recipe-json.component.html',
  styleUrls: ['./recipe-json.component.css']
})
export class RecipeJsonComponent implements OnInit {
  shortRecipes: Object[];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.shortRecipes = this.recipeService.getFullRecipes().map(recipe => {return {'name': recipe.name, 'ingredients': recipe.ingredients, 'instructions': recipe.instructions, 'imagePath': recipe.imagePath}})
    // this.shortRecipes = this.recipeService.getFullRecipes()
  }

  onClick(){
    const blob = new Blob([JSON.stringify(this.shortRecipes, null, 2)], {type : 'application/json'})
    saveAs(blob, 'recipesFile')
  }

  onClose(){
    this.router.navigate(['/recipes']);
  }
}
