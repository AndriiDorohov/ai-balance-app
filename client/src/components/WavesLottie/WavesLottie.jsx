import Lottie from "lottie-react";
import wavesDefault from "../../assets/animations/waves.json";
import wavesBlue from "../../assets/animations/waves_blue.json";
import wavesLavanda from "../../assets/animations/waves_lavanda.json";

const animations = {
  default: wavesDefault,
  blue: wavesBlue,
  lavanda: wavesLavanda,
};

export default function WavesLottie({ variant = "default", opacity = 0.8 }) {
  const animationData = animations[variant] || wavesDefault;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity,
        overflow: "hidden",
      }}
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
