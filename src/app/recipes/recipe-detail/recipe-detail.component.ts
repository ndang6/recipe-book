import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  videoUrl: SafeResourceUrl = null;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
        
        if(!this.recipe){
          this.recipe = {
            name: '',
            desc: '',
            category: '',
            imagePath: '',
            localImage: null,
            ingredients: [],
            videoURL: 'https://www.youtube.com/embed/tB55iAo3p2Y',
            instructions: []
          }
        } 
      }
    )
  }

  // updateVideoUrl(){
  //   console.log(this.recipe.videoURL)
  //   this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/tB55iAo3p2Y');
  //   // this.videoUrl = <string>this.sanitizer.bypassSecurityTrustResourceUrl(this.recipe.videoURL)
  // }

  // removeVideoUrl(){
  //   this.videoUrl = null;
  // }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.recipeService.setRecipes(this.recipeService.getFullRecipes())
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onClose(){
    this.router.navigate(['/recipes']);
  }
}
