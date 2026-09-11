export type Gender = "men" | "women";

export type TopCategory = "shirts" | "polos" | "sweaters" | "cardigans";
export type BottomCategory = "trousers" | "chinos" | "jeans";
export type AccessoryCategory = "watches" | "eyewear" | "belts";
export type Subcategory = TopCategory | BottomCategory | AccessoryCategory;
export type Category = "tops" | "bottoms" | "accessories";

export type Season = "spring" | "summer" | "autumn" | "winter" | "all-season";
export type Fit = "slim" | "regular" | "relaxed" | "tailored";

export type ProductColor = {
  name: string;
  hex: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  category: Category;
  subcategory: Subcategory;
  collection: string;
  price: number;
  currency: "GBP";
  colors: ProductColor[];
  sizes: string[];
  feel: string;
  careInstructions: string[];
  material: string;
  fit: Fit;
  season: Season;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  stock: number;
  pairsWith: string[];
  tone: "cream" | "navy" | "olive" | "burgundy" | "stone" | "charcoal";
};
