//sycn behaviors too add and remove ingredient
import * as actionTypes from './actionTypes';

export const addIngredient = (name)=>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    }
}

export const removeIngredient = (name)=>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    }
}