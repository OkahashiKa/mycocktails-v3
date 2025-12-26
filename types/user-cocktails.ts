export type UserCocktailIngredient = {
  name: string;
  amount: string;
  is_user_material: true;
};

export type UserCocktail = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  difficulty: "easy" | "normal" | "hard";
  alcohol_level: "low" | "medium" | "high";
  ingredients: UserCocktailIngredient[];
  missing_ingredients: string[];
  steps: string[];
};

export type UserCocktailResponse = {
  total: number;
  cocktails: UserCocktail[];
};
