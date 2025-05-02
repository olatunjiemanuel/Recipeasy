/**
 * Recipe type definition
 */
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

/**
 * Ingredient type definition
 */
export interface Ingredient {
  name: string;
  quantity: string;
  unit?: string;
}

/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  recipeCount: number;
  followersCount: number;
  followingCount: number;
  savedRecipes: string[];
  createdRecipes: string[];
}

/**
 * Navigation params for recipe details
 */
export type RecipeDetailsParams = {
  recipeId: string;
};