import Image from "next/image";
import { IoTimeOutline } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

async function getData(id) {
  const url = process.env.API_URL;
  const res = await fetch(`${url}/api/recipes/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const recipe = await getData(params.id);
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

function formatTimestamp(timestamp) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
}

export default async function Recipe({ params }) {
  const data = await getData(params.id);
  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
        <div className="bg-cover w-full h-[450px] text-center overflow-hidden flex justify-center items-center">
          <Image
            src={data.imageurl}
            alt="recipeImage"
            width={950}
            height={400}
            className="object-cover w-auto h-auto"
          />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div className="">
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-700 text-xs mt-2 flex items-end gap-2">
                  <FaPencil size={30} />

                  <span className="text-xl font-bold"> {data.creator} </span>
                </p>
                <p>
                  at{" "}
                  <span className="text-xl font-bold">
                    {formatTimestamp(data.createdAt)}
                  </span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-gray-900 font-bold text-3xl mb-2 flex items-center gap-2">
                  {data.title}
                </h1>
                <h1 className="text-gray-900 font-bold text-xl mb-2 flex items-center gap-3">
                  <IoTimeOutline size={30} />
                  {data.cookingtime}
                  <h2 className=" -ml-2">minutes</h2>
                </h1>
              </div>

              <h1 className="text-gray-900 font-bold text-3xl my-2">
                Description
              </h1>
              <p className="text-base leading-8 my-5">{data.description}</p>
              <h1 className="text-gray-900 font-bold text-3xl my-2">
                Ingredients
              </h1>
              <p className="text-base leading-8 my-5">{data.ingredients}</p>
              <h1 className="text-gray-900 font-bold text-3xl my-2">
                Instructions
              </h1>
              <p className="text-base leading-8 my-5">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
