import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import ResourcesSection from '@/components/ResourcesSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ResourcesSection />
      <GetInvolvedSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
