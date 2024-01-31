import EditForm from "@/components/EditForm";
import { useRouter } from "next/navigation";

const url = process.env.API_URL;

async function getData(id) {
  const res = await fetch(`${url}/api/recipes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// const handleUpdate = async (e) => {
//   e.preventDefault();
//   const title = e.target[0].value;
//   const imageurl = e.target[1].value;
//   const cookingtime = e.target[2].value;
//   const description = e.target[3].value;
//   const ingredients = e.target[4].value;
//   const instructions = e.target[5].value;

//   try {
//     await fetch("/api/recipes", {
//       method: "PATCH",
//       body: JSON.stringify({
//         title,
//         imageurl,
//         cookingtime,
//         description,
//         ingredients,
//         instructions,
//       }),
//     });
//     router.push("/recipes");
//   } catch (error) {
//     console.log(error);
//   }
// };

export default async function Edit({ params }) {
  const recipe = await getData(params.id);

  return (
    <EditForm
      id={recipe._id}
      title={recipe.title}
      imageurl={recipe.imageurl}
      cookingtime={recipe.cookingtime}
      description={recipe.description}
      ingredients={recipe.ingredients}
      instructions={recipe.instructions}
    />
  );
}
