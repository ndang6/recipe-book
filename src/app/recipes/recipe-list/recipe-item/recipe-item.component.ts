import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { faTag } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  faTag = faTag

  @Input() recipe: Recipe
  @Input() index: number

  nameFontSize: string = '16px'
  nameFontWeight: string = '500'
  descFontSize: string = '13px'

  isDoneLoading = false
  description: string = ''
  showDesc = false

  ngOnInit(): void {
    this.description = this.recipe.desc
    this.resizeText(this.description)
  }
  
  resizeText(description: string){
    const size = description.length

    if(size > 40){
      this.description = description.substring(0, 40) + '...'
    }
  }

  onDoneLoading() {
    this.isDoneLoading = true
  }

  onMouseOver(){
    this.description = this.recipe.desc
  }

  onMouseLeave(){ 
    this.resizeText(this.description)
  }

  // getAnchorClass(){
  //   return (this.recipe.category === 'dessert') 
  //     ? 'list-group-item list-group-item-success clearfix' 
  //     : 'list-group-item clearfix'
  // }
}
