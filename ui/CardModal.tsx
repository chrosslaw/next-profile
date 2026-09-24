import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";
import cardInfo from "@/app/cardInfo.json";
type CardModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const playSwipeSound = () => {
  // The path is relative to the `public` directory
  const audio = new Audio("/swipe.mp3");
  audio.play();
};

export default function CardModal({ open, setOpen }: CardModalProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        perspective: "1200px",
        pointerEvents: "none",
      }}
      className={`${open ? "backdrop-blur-sm" : ""}`}
    >
      <Card
        onClick={() => (setOpen(!open), playSwipeSound())}
        sx={{
          position: "absolute",
          cursor: "pointer",
          transition: "all 0.7s cubic-bezier(.25,.8,.25,1)",
          transformOrigin: "center",
          pointerEvents: "auto",
          ...(open
            ? {
                left: "50%",
                top: "50%",
                minWidth: { xs: "90vw", sm: 300, md: 320 },
                transform:
                  "translate(-50%, -50%) rotateX(0deg) rotateZ(0deg) scale(1)",
                boxShadow: "0px 12px 30px rgba(0,0,0,0.4)",
              }
            : {
                left: {
                  xs: "14%",
                  sm: "14%",
                  md: "1%",
                  lg: "4%",
                },
                bottom: {
                  xs: "-9%",
                  sm: "0%",
                  md: "6%",
                  lg: "10%",
                },
                minWidth: { xs: 100, sm: 250, md: 290, lg: 300 },
                transform: {
                  xs: "translate(-50%, 0) rotateX(55deg) rotateZ(-2deg) scale(0.1)",
                  sm: "translate(-50%, 0) rotateX(65deg) rotateZ(-2deg) scale(0.1)",
                  md: "translateY(0) rotateX(55deg) rotateZ(-3deg) scale(0.2)",
                  lg: "translateY(0) rotateX(65deg) rotateZ(-6deg) scale(0.3)",
                },
                boxShadow: "0px 6px 20px rgba(0,0,0,0.25)",
              }),
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: open ? 2 : 0,
            p: open ? 4 : 0,
          }}
        >
          <Avatar
            sx={{
              width: open ? 96 : 32,
              height: open ? 96 : 24,
            }}
            src="/profile.png"
            alt={`${cardInfo.name}`}
          />
          <Box>
            <Typography variant="h6">{cardInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {cardInfo.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cardInfo.role}
            </Typography>
            <Typography variant="body2">{cardInfo.email}</Typography>
            <Typography variant="body2">{cardInfo.phone}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
