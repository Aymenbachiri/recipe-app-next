"use client";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import { TiDelete } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/myrecipes?creator=${session?.data?.user.name}`,
    fetcher
  );
  console.log(data);
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
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status === "loading") {
    return <div>Loading...</div>;
  }
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div>
        <div className="container mx-auto p-4">
          <h1 className="text-center text-4xl">My Recipes</h1>
          {data ? (
            <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 mb-16 mt-16">
              {data.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-md overflow-hidden relative shadow-md"
                >
                  <div>
                    <Image
                      className="w-auto h-auto object-cover "
                      width={400}
                      height={30}
                      src={item.imageurl}
                      alt="Recipe Title"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-2xl text-green-400">{item.title} </h2>
                    <div className="flex justify-between mt-4 mb-4 text-gray-500">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="ml-1 lg:text-xl">
                          {item.cookingtime} m
                        </span>
                      </div>

                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="ml-1 lg:text-xl">1-2</span>
                      </div>
                    </div>
                    <p className="mb-4 text-gray-500">
                      {item.description.substring(0, 100)}...
                    </p>
                    <div className="flex items-center mb-4">
                      <FaCircleUser
                        size={50}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          {item.creator}
                        </p>
                        <p className="text-gray-600">
                          {formatTimestamp(item.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center w-full gap-3">
                      <Link
                        href={`/recipes/${item._id}`}
                        className="text-white text-center bg-green-400 p-4 rounded-md w-full uppercase"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-white flex items-center justify-center bg-red-400  rounded-md w-full uppercase"
                      >
                        <TiDelete size={55} />
                      </button>
                      <Link
                        href={`/edit/${item._id}`}
                        className="text-white flex items-center justify-center bg-gray-400  rounded-md w-full uppercase"
                      >
                        <FaEdit className="ml-3" size={55} />
                      </Link>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 mt-4 mr-4 bg-green-400 text-white rounded-full pt-1 pb-1 pl-4 pr-5 text-xs uppercase">
                    <span>Medium</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h1>Loading ...</h1>
          )}
        </div>
      </div>
    );
  }
}
