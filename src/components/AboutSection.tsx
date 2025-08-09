import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, Award, MapPin, Mail, Phone } from 'lucide-react';

const AboutSection = () => {
  const legalInfo = [
    { label: 'NPO Registration', value: '320-188 NPO' },
    { label: 'PBO Number', value: '930086288' },
    { label: 'Tax Number', value: '9659941190' },
  ];

  const achievements = [
    { icon: Users, title: '500+ Youth Reached', description: 'Directly impacted through our programs' },
    { icon: Award, title: '5+ Years Experience', description: 'Dedicated service to communities' },
    { icon: Target, title: '15+ Schools', description: 'Partnership programs across Tshwane' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">About Our Foundation</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Mission & Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded with a vision to empower South African youth, we work tirelessly to prevent 
            teenage pregnancy through education, support, and community engagement.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 shadow-card">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-6">Our Mission</h3>
              <p className="text-lg text-foreground leading-relaxed max-w-4xl mx-auto">
                To reduce teenage pregnancy rates in South Africa through comprehensive education, 
                counseling services, community outreach programs, and by empowering young people 
                with the knowledge and resources they need to make informed decisions about their 
                reproductive health and future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center shadow-card hover:shadow-warm transition-smooth">
              <CardContent className="p-6">
                <div className="inline-flex p-3 bg-gradient-hero rounded-lg mb-4">
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  {achievement.title}
                </h4>
                <p className="text-muted-foreground">
                  {achievement.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact & Legal Info */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-foreground mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">
                      9032 Stand Ext. 36, Olievenhoutbosch<br />
                      Tshwane, 0175
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">Ifutshane56@gmail.com</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="default" className="w-full">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <h4 className="text-xl font-semibold text-foreground mb-6">Legal Information</h4>
              <div className="space-y-4">
                {legalInfo.map((info, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                    <span className="font-medium text-foreground">{info.label}</span>
                    <Badge variant="secondary">{info.value}</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  SA Servants is a registered Non-Profit Organization and Public Benefit Organization, 
                  committed to transparency and accountability in all our operations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;