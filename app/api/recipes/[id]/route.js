import Recipe from "@/models/Recipe";
import connectToDB from "@/utils/db";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();

    const recipe = await Recipe.findById(id);
    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};

export async function PATCH(req, { params }) {
  const body = await req.json();
  // const newRecipe = new Recipe(body);
  try {
    await connectToDB();
    // Find the recipe by id
    const existingRecipe = await Recipe.findById(params.id);

    if (!existingRecipe) {
      return new Response("Recipe not found", { status: 404 });
    }

    // Update the recipe with the new data
    Object.assign(existingRecipe, body);

    await existingRecipe.save();

    return new Response("Recipe has been updated", { status: 201 });
  } catch (error) {
    return new Response("Failed to update recipe", { status: 500 });
  }
}

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();

    await Recipe.findByIdAndDelete(id);
    return new Response("Recipe has been deleted", { status: 200 });
  } catch (error) {
    return new Response("failed to delete recipe", { status: 500 });
  }
};
