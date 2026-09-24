import Image from "next/image";
export default function Header() {
  return (
    <header className="flex justify-center items-centers">
      <div className="flex items-start p-2 max-w-6xl w-full">
        <Image
          src={"/Logo.svg"}
          alt="Chrosslaw logo"
          width={150}
          height={150}
          className="rounded-md"
        />
      </div>
    </header>
  );
}
