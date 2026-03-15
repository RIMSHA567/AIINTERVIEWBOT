import Navbar from "../components/Navbar";
import Hero from "../components/home_components/Hero";
import FeatureCards from "../components/home_components/FeatureCards";
import IntelligenceModes from "../components/home_components/IntelligenceModes";
import CTASection from "../components/home_components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar />
      <Hero />
      <FeatureCards />
      <IntelligenceModes />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
