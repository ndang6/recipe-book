import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent { 
  @Input() 
  recipe: Recipe;

  @Input()
  index: number;
  height: string = '60px'
  width: string = '60px'
  borderRadius: string = '50%'
  nameFontSize: string = '16px'
  nameFontWeight: string = '500'
  descFontSize: string = '13px'

  isDoneLoading = false

  onDoneLoading() {
    this.isDoneLoading = true
  }

  onMouseOver(){
    this.borderRadius = '10%'
    this.nameFontSize = '20px'
  }

  onMouseLeave(){ 
    this.borderRadius = '50%'
    this.nameFontSize = '16px'
  }
}
