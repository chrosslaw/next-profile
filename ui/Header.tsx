import Image from "next/image";
export default function Header() {
  return (
    <header className="flex justify-center items-center">
      <div className="flex  p-2 max-w-6xl w-full rounded-md items-center">
        <Image
          src={"/Logo.svg"}
          alt="Chrosslaw logo"
          width={150}
          height={150}
          className="rounded-md "
        />
        <div className="flex flex-col  ml-4 gap-2 w-full">
          <h1 className="text-6xl px-2 font-bold italic ">
            Welcome to Chris' Office.
          </h1>
          <h2 className="flex text-3xl px-2 font-bold italic self-end">
            Feel free to look around.
          </h2>
        </div>
      </div>
    </header>
  );
}
