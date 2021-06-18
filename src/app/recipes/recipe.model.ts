import { Ingredient } from "./ingredient.model";
import { Instruction } from "./instruction.model";

export class Recipe{
    public id?: number;

    constructor(
        id: number,
        public name: string,
        public category: string, 
        public desc: string, 
        public imagePath: string,
        public localImage: string | ArrayBuffer, 
        public ingredients: Ingredient[], 
        public instructions: Instruction[]) {
            this.id = id
        }
} 