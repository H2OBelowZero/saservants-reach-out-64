import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgramPreview } from '@/components/ui/program-preview';
import { Calendar, Users, BookOpen, MessageCircle, School, HandHeart } from 'lucide-react';

const ProgramsSection = () => {
  const programs = [
    {
      icon: BookOpen,
      title: 'Educational Workshops',
      description: 'Comprehensive workshops covering reproductive health, life skills, and career guidance for teenagers.',
      features: ['Age-appropriate content', 'Interactive sessions', 'Certified facilitators'],
      status: 'Ongoing',
      participants: '100+ monthly'
    },
    {
      icon: School,
      title: 'School Outreach',
      description: 'Direct engagement with schools across Tshwane to deliver prevention programs and support systems.',
      features: ['In-school presentations', 'Teacher training', 'Student support groups'],
      status: 'Active in 15+ schools',
      participants: '300+ students'
    },
    {
      icon: MessageCircle,
      title: 'Counseling Services',
      description: 'One-on-one and group counseling sessions providing emotional support and guidance.',
      features: ['Professional counselors', 'Confidential sessions', 'Crisis intervention'],
      status: 'Available weekdays',
      participants: '50+ counseled'
    },
    {
      icon: HandHeart,
      title: 'Community Partnerships',
      description: 'Collaborative initiatives with local organizations to extend our reach and impact.',
      features: ['Healthcare partnerships', 'Youth centers', 'Community events'],
      status: 'Growing network',
      participants: '10+ partners'
    }
  ];

  return (
    <section id="programs" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Our Programs</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Making a Real Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive programs are designed to address teenage pregnancy through 
            education, support, and community engagement.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => {
            const getProgramType = (title: string) => {
              if (title.includes('Educational')) return 'educational';
              if (title.includes('School')) return 'outreach';
              if (title.includes('Counseling')) return 'counseling';
              if (title.includes('Partnership')) return 'partnerships';
              return 'educational';
            };

            return (
              <ProgramPreview
                key={index}
                type={getProgramType(program.title)}
                title={program.title}
                description={program.description}
                features={program.features}
                status={program.status}
                participants={program.participants}
              >
                <Card className="shadow-card hover:shadow-warm transition-smooth group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-hero rounded-lg group-hover:scale-110 transition-bounce">
                          <program.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground">{program.title}</CardTitle>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {program.status}
                            </Badge>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Users className="h-3 w-3" />
                              <span className="text-xs">{program.participants}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {program.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="subtle" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </ProgramPreview>
            );
          })}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-hero text-white shadow-warm">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to Get Involved?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join us in making a difference in young people's lives. Whether you're interested 
              in volunteering, partnerships, or supporting our programs, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="warm" size="lg">
                Volunteer With Us
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Become a Partner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProgramsSection;