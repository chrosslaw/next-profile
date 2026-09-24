const playSwitchSound = () => {
  // The path is relative to the `public` directory
  const audio = new Audio("/switch.mp3");
  audio.play();
};

type ButtonsProps = {
  setTheme: (theme: string) => void;
  theme: string;
  light: string;
  dark: string;
  setOpen: (open: boolean) => void;
  setBackground: (background: string) => void;
};

export default function Buttons({
  setTheme,
  theme,
  light,
  dark,
  setBackground,
}: ButtonsProps) {
  return (
    <div>
      <button
        onClick={() => (
          setTheme(theme === `${light}` ? `${dark}` : `${light}`),
          setBackground(theme === `${light}` ? "2" : ""),
          playSwitchSound()
        )}
        className="absolute top-[43%] left-[4%] p-1 min-h-8 min-w-6 rounded-md hover:bg-white hover:opacity-[10%] cursor-pointer"
      ></button>
    </div>
  );
}
