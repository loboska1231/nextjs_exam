import {IRecipe} from "@/models/recipes-models/IRecipe";

export interface IRecipeResponse{
    recipes:IRecipe[],
    total:number,
    skip:number,
    limit:number,
}