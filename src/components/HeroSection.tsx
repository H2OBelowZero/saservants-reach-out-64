import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Young people in educational setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empowering South African{' '}
            <span className="text-accent">Youth</span> for a{' '}
            <span className="text-accent">Brighter Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            SA Servants Fights Against Teenage Pregnancy Foundation is dedicated to educating, 
            supporting, and empowering young people to make informed decisions about their future.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">500+ Youth Empowered</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">50+ Programs Delivered</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Heart className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Community Impact</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group">
              Learn About Our Mission
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="warm" size="lg">
              Get Involved Today
            </Button>
            <Button variant="subtle" size="lg">
              View Resources
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;