import Image from "next/image";
export default function Header() {
  return (
    <header className="flex place-content-center ">
      <div className="flex flex-col md:flex-row md:p-4 max-w-6xl w-full rounded-md place-items-center ">
        <Image
          src={"/Logo.svg"}
          alt="Chrosslaw logo"
          width={150}
          height={150}
          className="rounded-md "
        />
        <div className="flex flex-col place-content-start gap-2 w-full px-2">
          <h1 className="text-3xl sm:4xl lg:text-5xl font-bold italic place-self-start px-2 text-white">
            Welcome to Chris' Office.
          </h1>
          <h2 className="flex text-2xl sm:3xl lg:text-3xl font-bold italic self-end text-white">
            Feel free to look around.
          </h2>
        </div>
      </div>
    </header>
  );
}
