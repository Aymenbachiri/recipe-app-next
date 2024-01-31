import Image from "next/image";
import cooking from "/public/undraw_Cooking_p7m1.png";

export default function Home() {
  return (
    <div className="p-8 md:flex md:items-center sm:flex-col md:flex-row gap-24 mt-10">
      <div className="flex-1 flex flex-col gap-12">
        <h1 className="text-5xl font-bold">Super quick recipes.</h1>
        <h1 className="text-5xl font-bold">easy-to-find ingredients.</h1>
        <p className="text-xl font-normal">
          Unlock the flavors of the world with our delicious recipes!.
        </p>
      </div>
      <Image src={cooking} alt="cooking" />
      <div className=""></div>
    </div>
  );
}
