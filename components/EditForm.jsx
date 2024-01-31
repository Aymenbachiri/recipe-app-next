"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditForm({
  id,
  title: initialTitle,
  imageurl: initialImageUrl,
  cookingtime: initialCookingTime,
  description: initialDescription,
  ingredients: initialIngredients,
  instructions: initialInstructions,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [imageurl, setImageUrl] = useState(initialImageUrl);
  const [cookingtime, setCookingTime] = useState(initialCookingTime);
  const [description, setDescription] = useState(initialDescription);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          imageurl,
          cookingtime,
          description,
          ingredients,
          instructions,
        }),
      });
      if (response.ok) {
        router.push("/recipes");
      } else {
        throw new Error("Failed to update recipe");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mt-10">
      <div>
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
          Edit Recipe
        </div>
        <form
          onSubmit={handleUpdate}
          className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        >
          <label> Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Title"
            type="text"
            required
          />
          <label>Image Url (only from unspash.com)</label>
          <input
            value={imageurl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="https://images.unsplash.com/photo-1171"
            type="text"
            required
          />
          <label>Cooking Time (minutes)</label>
          <input
            value={cookingtime}
            onChange={(e) => setCookingTime(e.target.value)}
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            placeholder="Example 90"
            type="number"
            required
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="Describe everything about this recipe here"
            required
          />
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="Write all Ingredients"
            required
          />
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
            spellCheck="false"
            placeholder="give all Instructions"
            required
          />

          <div className="buttons flex mt-4">
            <button
              type="reset"
              className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border border-green-500 p-1 px-4 font-semibold cursor-pointer text-white ml-2 bg-green-400"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
