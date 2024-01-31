"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Create() {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const imageurl = e.target[1].value;
    const cookingtime = e.target[2].value;
    const description = e.target[3].value;
    const ingredients = e.target[4].value;
    const instructions = e.target[5].value;

    try {
      await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify({
          title,
          imageurl,
          cookingtime,
          description,
          ingredients,
          instructions,
          creator: session.data.user.name,
        }),
      });
      router.push("/recipes");
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "authenticated") {
    return (
      <div>
        <div>
          <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
            Post Recipe
          </div>

          <form
            onSubmit={handleSubmit}
            className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
          >
            <label>Title</label>
            <input
              className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              spellCheck="false"
              placeholder="Title"
              type="text"
              required
            />
            <label>Image Url (only from unspash.com)</label>
            <input
              className="bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              spellCheck="false"
              placeholder="https://images.unsplash.com/photo-1171"
              type="text"
              required
            />
            <label>Cooking Time (minutes)</label>
            <input
              className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
              spellCheck="false"
              placeholder="Example 90"
              type="number"
              required
            />
            <label>Description</label>
            <textarea
              className="description bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
              spellCheck="false"
              placeholder="Describe everything about this recipe here"
              required
            ></textarea>
            <label>Ingredients</label>
            <textarea
              className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
              spellCheck="false"
              placeholder="Write all Ingredients"
              required
            ></textarea>
            <label>Instructions</label>
            <textarea
              className="bg-gray-100 sec p-3 h-24 overflow-y-scroll border border-gray-300 outline-none resize-none"
              spellCheck="false"
              placeholder="give all Instructions"
              required
            ></textarea>

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
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
