import Navigation from '@/components/Navigation';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import Footer from '@/components/Footer';

const GetInvolved = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;