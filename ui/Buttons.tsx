import PdfViewerModal from "@/ui/PdfViewerModal";
import YouTubeAudioPlayer from "@/ui/YouTubeAudioPlayer";
const playSwitchSound = () => {
  // The path is relative to the `public` directory
  const audio = new Audio("/switch.mp3");
  audio.play();
};

export default function Buttons({ changeTheme }: { changeTheme: () => void }) {
  return (
    <div>
      <button
        onClick={() => {
          changeTheme();
          playSwitchSound();
        }}
        className="absolute top-[42%] left-[3%] min-h-6 min-w-4 md:min-h-10 md:min-w-8 rounded-md hover:bg-blue-100 hover:opacity-[1%] cursor-pointer hover:animate-pulse transition-all"
      ></button>
      <PdfViewerModal
        fileUrl="/resume.pdf"
        downloadName="Christopher_Lawrence_Resume.pdf"
      />
      <YouTubeAudioPlayer videoId="PP1HTYB2Rtg" />
    </div>
  );
}
