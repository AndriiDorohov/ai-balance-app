import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import WavesLottie from "../../components/WavesLottie/WavesLottie";

import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <WavesLottie variant="default" />
      </div>
      <div className={styles.content}>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
