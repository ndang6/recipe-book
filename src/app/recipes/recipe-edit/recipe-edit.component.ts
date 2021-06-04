import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  authorizedUserEmail: boolean;

  selectedFile: string | ArrayBuffer = null;
  downloadURL: Observable<String>;
  localImageURL: String;
  localImageName: String;

  constructor(
    private route: ActivatedRoute, 
    private recipeService: RecipeService, 
    private router: Router, 
    private authService: AuthService, 
    private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();

        let email = this.authService.getUserEmail()
        this.authorizedUserEmail = email === "admin@test.com" || email === "maica59aimable@gmail.com";
      }
    )
  }

  initForm(){
    let recipeName = '';
    let recipeCategory = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeInstructions = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      const imageURL = recipe.imagePath
      if(imageURL.includes('firebasestorage')) // image stored in firebase
        this.localImageName = imageURL.split('?')[0].substring(imageURL.lastIndexOf('/') + 1)

      recipeName = recipe.name
      recipeCategory = recipe.category
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.desc

      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            // 'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
            'amount': new FormControl(ingredient.amount),
            'unit': new FormControl(ingredient.unit)
          }));
        }
      }

      if(recipe['instructions']){
        for(let instruction of recipe.instructions){
          recipeInstructions.push(new FormGroup({
            'step': new FormControl(instruction.step, Validators.required)
          }))
        }
      }
    }

    // Initialize Form
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'category': new FormControl(recipeCategory, Validators.required),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
      'instructions': recipeInstructions
    });
  }

  onSave(){
    let {name, category, description, imagePath, ingredients, instructions} = this.recipeForm.value;

    if(this.localImageURL) imagePath = this.localImageURL
    const newRecipe = new Recipe(name, category, description, imagePath, this.selectedFile, ingredients, "https://www.youtube.com/embed/tB55iAo3p2Y", instructions);
      
    if(this.editMode)
      this.recipeService.updateRecipe(this.id, newRecipe);
    else
      this.recipeService.addRecipe(newRecipe);

    this.onCancel();
  }

  getIngredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  getInstructionsControls(){
    return (<FormArray>this.recipeForm.get('instructions')).controls;
  }

  onAddInstruction(){
    (<FormArray>this.recipeForm.get('instructions')).push(new FormGroup({
      'step': new FormControl(null, Validators.required)
    }))
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      // 'amount': new FormControl(null, [Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'amount': new FormControl(null),
      'unit': new FormControl(null)
    }));
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onDeleteInstruction(index: number){
    (<FormArray>this.recipeForm.get('instructions')).removeAt(index);
  }

  onSelectFile(event: any) {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0]
    const fileName = event.target.files[0].name.split('.')[0]
    const fileRef = this.storage.ref(fileName)

    this.storage.upload(fileName, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => this.localImageURL = url)
          // url = https://firebasestorage.googleapis.com/v0/b/recipe-book-9d0ab.appspot.com/o/signature?alt=media&token=66b3e7dd-2d3e-46e5-bd8d-3e8e8e422295
        })
      ).subscribe()

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event) => {
      this.selectedFile = event.target.result;  
    }
  }

  formattedName(name: String) {
    return name.replace(/%20/g, ' ')
  }
}
