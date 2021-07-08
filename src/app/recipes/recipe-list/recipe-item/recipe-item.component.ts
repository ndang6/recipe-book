import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { state, style, transition, animate, trigger } from '@angular/animations'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  animations: [
    trigger('changeDivSize', [
      state('initial', style({
      })),
      state('final', style({
        height: '105px'
      })),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('150ms'))
    ]),
  ]
})
export class RecipeItemComponent implements OnInit{
  faTag = faTag
  currentState: string = 'initial'
  descSize: number = 0

  @Input() recipe: Recipe
  @Input() index: number

  isDoneLoading: boolean = false
  description: string = ''

  ngOnInit(): void {
    this.description = this.recipe.desc
    this.descSize = this.description.length
    this.resizeText(this.description)
  }
  
  resizeText(description: string){
    const size = description.length

    if(this.descSize > 38){
      const tempDescription = description.substring(0, 38)
      const lastSpaceIndex = tempDescription.lastIndexOf(" ")
      this.description = tempDescription.substring(0, lastSpaceIndex) + " ..."
    }
  }

  onDoneLoading() { this.isDoneLoading = true }

  onMouseOver(){
    if(this.descSize > 38){
      this.description = this.recipe.desc
      this.currentState = 'final' 
    }   
  }

  onMouseLeave(){
    if(this.descSize > 38){
      this.resizeText(this.description)
      this.currentState = 'initial'
    }      
  }
}
