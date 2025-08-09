import Navigation from '@/components/Navigation';
import ProgramsSection from '@/components/ProgramsSection';
import Footer from '@/components/Footer';

const Programs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Programs;