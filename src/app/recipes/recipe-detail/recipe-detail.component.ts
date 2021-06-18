import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { faEdit, faTrashAlt, faLevelDownAlt, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  faEdit = faEdit
  faTrashAlt = faTrashAlt
  faLevelDownAlt = faLevelDownAlt
  faLevelUpAlt = faLevelUpAlt

  @ViewChild('editButton') editButton: ElementRef

  recipeImagePositionAbove = true
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute, 
    private router: Router) {}

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
            instructions: []
          }
        } 
      }
    )
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  onClose(){
    this.router.navigate(['/recipes']);
  }

  changeImagePosition(){
    this.recipeImagePositionAbove = !this.recipeImagePositionAbove
  }

  closeEditButton(){
    if(this.editButton.nativeElement.classList.contains('open'))
      this.editButton.nativeElement.click()
  }
}
