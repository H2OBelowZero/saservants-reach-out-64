import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import GovernanceSection from '@/components/GovernanceSection';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <AboutSection />
        <GovernanceSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;