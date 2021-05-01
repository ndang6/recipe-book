import { Subject } from "rxjs";
import { Ingredient } from "../recipes/ingredient.model";

export class ShoppingListService {
    ingredientImage = {
        "tomato": "https://media.istockphoto.com/photos/tomato-isolated-on-white-background-picture-id466175630?k=6&m=466175630&s=612x612&w=0&h=fu_mQBjGJZIliOWwCR0Vf2myRvKWyQDsymxEIi8tZ38=",
        "cucumber": "https://www.freshpoint.com/wp-content/uploads/2020/02/freshpoint-english-cucumber-scaled.jpg",
        "potato": "https://lh3.googleusercontent.com/proxy/0CU5mPsJkBnd_Yf5Q3kJ7yOy_pT3YeqTNFdLeaj-HdXp3X35zsI4pFGHJy-WEz3x8i_jHzEkOFGuqwgQZNmnrh7BxACmbameH1zFCeMil5yoKlfHqM2sccPIPcTxG9M1Z5x-ZJE",
        "bread": "https://thumbs.dreamstime.com/b/long-loaf-bread-22826883.jpg"
    }

    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(newIngredients: Ingredient[]){
        this.ingredients.push(...newIngredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
        this.ingredients.splice(index, 1); // removes 1 element at the "index" position
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}