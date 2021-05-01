import { Ingredient } from "./ingredient.model";
import { Instruction } from "./instruction.model";

export class Recipe{
    constructor(
        public name: string,
        public category: string, 
        public desc: string, 
        public imagePath: string,
        public localImage: string | ArrayBuffer, 
        public ingredients: Ingredient[], 
        public videoURL: string,
        public instructions: Instruction[]) {}
} 