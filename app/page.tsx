import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-screen h-[calc(100vh-5rem)]">
      <Image
        className="object-contain"
        src="/Office.PNG"
        alt="Office Image"
        fill={true}
        priority
      />

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
