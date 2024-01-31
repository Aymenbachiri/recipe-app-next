import Recipe from "@/models/Recipe";
import connectToDB from "@/utils/db";

export async function GET(req) {
  try {
    await connectToDB();

    const recipes = await Recipe.find({});

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
}

export async function POST(req) {
  const body = await req.json();
  const newRecipe = new Recipe(body);
  try {
    await connectToDB();
    await newRecipe.save();

    return new Response("Recipe has been created", { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
}
