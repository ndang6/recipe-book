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

  isDoneLoading: boolean = false
  description: string = ''

  ngOnInit(): void {
    this.description = this.recipe.desc
    this.resizeText(this.description)
  }
  
  resizeText(description: string){
    const size = description.length

    if(size > 38){
      const tempDescription = description.substring(0, 38)
      const lastSpaceIndex = tempDescription.lastIndexOf(" ")
      this.description = tempDescription.substring(0, lastSpaceIndex) + " ..."
    }
  }

  onDoneLoading() { this.isDoneLoading = true }

  onMouseOver(){ this.description = this.recipe.desc }

  onMouseLeave(){  this.resizeText(this.description) }
}
