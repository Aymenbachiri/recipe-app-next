import { Schema, model, models } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    cookingtime: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", recipeSchema);
export default Recipe;
