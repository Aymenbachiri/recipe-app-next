import Recipe from "@/models/Recipe";
import connectToDB from "@/utils/db";

export async function GET(req) {
  const url = new URL(req.url);

  const creator = url.searchParams.get("creator");
  try {
    await connectToDB();

    const recipes = await Recipe.find(creator && { creator });

    return new Response(JSON.stringify(recipes), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all recipes", { status: 500 });
  }
}
