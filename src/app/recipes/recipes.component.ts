import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  error = null 

  constructor( private dataStorageService: DataStorageService ) { }

  ngOnInit(): void {
    this.dataStorageService.fetchRecipes()
      .subscribe(
        response => {},
        error => this.error = error.message );
   }
}
