import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProgramsSection from '@/components/ProgramsSection';
import ResourcesSection from '@/components/ResourcesSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import EmergencyBanner from '@/components/EmergencyBanner';
import FloatingHelpline from '@/components/FloatingHelpline';

const Index = () => {
  return (
    <div className="min-h-screen">
      <EmergencyBanner />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ResourcesSection />
      <GetInvolvedSection />
      <ContactSection />
      <Footer />
      <FloatingHelpline />
    </div>
  );
};

export default Index;
