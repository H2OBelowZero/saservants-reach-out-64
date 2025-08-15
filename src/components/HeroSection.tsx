import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Heart } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import StatsDisplay from '@/components/StatsDisplay';

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
          <div className="mb-4 px-4 py-2 bg-red-600/90 rounded-lg inline-block">
            <p className="text-white font-semibold text-sm">
              URGENT: On New Year's Day 2025, a 12-year-old became a mother in South Africa.
            </p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Help us change{' '}
            <span className="text-accent">this story</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            SA Servants Fights Against Teenage Pregnancy Foundation prevents the next 12-year-old mother 
            through community-driven education and support programs.
          </p>

          {/* Critical Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">1,448 births on New Year's Day 2025</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">80+ teenage mothers in one day</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Heart className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium">Youngest mother: 12 years old</span>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/about">
              <Button variant="hero" size="lg" className="group">
                Learn About Our Mission
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="warm" size="lg">
                Get Involved Today
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="subtle" size="lg">
                View Resources
              </Button>
            </Link>
          </div>

          {/* Dynamic Stats */}
          <div className="mt-12">
            <StatsDisplay />
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