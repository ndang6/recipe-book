import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-json',
  templateUrl: './recipe-json.component.html',
  styleUrls: ['./recipe-json.component.css']
})
export class RecipeJsonComponent implements OnInit {
  shortRecipes: Object[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.shortRecipes = this.recipeService.getFullRecipes().map(recipe => {return {'name': recipe.name, 'ingredients': recipe.ingredients, 'instructions': recipe.instructions}})
  }
}
