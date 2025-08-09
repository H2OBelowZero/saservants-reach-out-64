import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Users, HandHeart, Briefcase, DollarSign, Calendar } from 'lucide-react';
import VolunteerModal from '@/components/modals/VolunteerModal';
import PartnerModal from '@/components/modals/PartnerModal';
import FundraisingModal from '@/components/modals/FundraisingModal';
import EventModal from '@/components/modals/EventModal';

const GetInvolvedSection = () => {
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [fundraisingOpen, setFundraisingOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const opportunities = [
    {
      icon: Users,
      title: 'Volunteer with Us',
      description: 'Join our team of dedicated volunteers making a direct impact in communities.',
      commitment: 'Flexible hours',
      skills: ['Communication', 'Empathy', 'Community work'],
      action: 'Apply to Volunteer'
    },
    {
      icon: Briefcase,
      title: 'Professional Partnerships',
      description: 'Collaborate with us as a healthcare professional, educator, or counselor.',
      commitment: 'Project-based',
      skills: ['Professional expertise', 'Training delivery', 'Program development'],
      action: 'Become a Partner'
    },
    {
      icon: DollarSign,
      title: 'Fundraising Ambassador',
      description: 'Help us raise funds and awareness through your networks and communities.',
      commitment: 'Campaign-based',
      skills: ['Networking', 'Event planning', 'Social media'],
      action: 'Join Fundraising'
    },
    {
      icon: Calendar,
      title: 'Event Organizer',
      description: 'Plan and execute community events, workshops, and awareness campaigns.',
      commitment: '5-10 hours/month',
      skills: ['Event planning', 'Project management', 'Coordination'],
      action: 'Organize Events'
    }
  ];

  return (
    <section id="get-involved" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Join Our Mission</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Get Involved
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            There are many ways to support our mission. Whether you have an hour or a lifetime to give, 
            we have opportunities that match your passion and availability.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="shadow-card hover:shadow-warm transition-smooth group">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-hero rounded-lg group-hover:scale-110 transition-bounce">
                    <opportunity.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground mb-2">
                      {opportunity.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {opportunity.commitment}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {opportunity.description}
                </p>
                <div className="mb-6">
                  <h5 className="font-medium text-foreground mb-2">Skills Needed:</h5>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="subtle" 
                  className="w-full"
                  onClick={() => {
                    if (opportunity.action === 'Apply to Volunteer') setVolunteerOpen(true);
                    else if (opportunity.action === 'Become a Partner') setPartnerOpen(true);
                    else if (opportunity.action === 'Join Fundraising') setFundraisingOpen(true);
                    else if (opportunity.action === 'Organize Events') setEventOpen(true);
                  }}
                >
                  {opportunity.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Volunteer Application Form */}
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Volunteer Application</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Ready to make a difference? Fill out our volunteer application form.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volFirstName">First Name</Label>
                    <Input id="volFirstName" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volLastName">Last Name</Label>
                    <Input id="volLastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volEmail">Email Address</Label>
                  <Input id="volEmail" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volPhone">Phone Number</Label>
                  <Input id="volPhone" type="tel" placeholder="+27 12 345 6789" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volArea">Preferred Area</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your area of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshops">Educational Workshops</SelectItem>
                      <SelectItem value="counseling">Counseling Support</SelectItem>
                      <SelectItem value="outreach">Community Outreach</SelectItem>
                      <SelectItem value="events">Event Organization</SelectItem>
                      <SelectItem value="admin">Administrative Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volExperience">Relevant Experience</Label>
                  <Textarea 
                    id="volExperience" 
                    placeholder="Tell us about any relevant experience or skills..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="volAvailability">Availability</Label>
                  <Textarea 
                    id="volAvailability" 
                    placeholder="When are you available? (days, times, frequency)"
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="bgCheck" />
                  <Label htmlFor="bgCheck" className="text-sm">
                    I agree to undergo a background check if required
                  </Label>
                </div>
                
                <Button variant="hero" className="w-full">
                  Submit Application
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Partnership Inquiry */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HandHeart className="h-5 w-5 text-primary" />
                  <span>Partnership Inquiry</span>
                </CardTitle>
                <p className="text-muted-foreground">
                  Interested in partnering with us? Let's discuss how we can work together.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">Organization Name</Label>
                  <Input id="orgName" placeholder="Your organization" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="partnerType">Partnership Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare Provider</SelectItem>
                      <SelectItem value="education">Educational Institution</SelectItem>
                      <SelectItem value="corporate">Corporate Sponsor</SelectItem>
                      <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="partnerDetails">Partnership Details</Label>
                  <Textarea 
                    id="partnerDetails" 
                    placeholder="Describe how you'd like to partner with us..."
                    className="min-h-[100px]"
                  />
                </div>
                
                <Button variant="subtle" className="w-full">
                  Submit Partnership Inquiry
                </Button>
              </CardContent>
            </Card>

            {/* Impact Stats */}
            <Card className="bg-gradient-hero text-white shadow-warm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center">Your Impact Matters</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-white/80 text-sm">Youth Reached</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-white/80 text-sm">Active Volunteers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-white/80 text-sm">School Partners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-white/80 text-sm">Community Focus</div>
                  </div>
                </div>
                <p className="text-white/90 text-center mt-4 text-sm">
                  Join our growing community of changemakers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <VolunteerModal open={volunteerOpen} onOpenChange={setVolunteerOpen} />
      <PartnerModal open={partnerOpen} onOpenChange={setPartnerOpen} />
      <FundraisingModal open={fundraisingOpen} onOpenChange={setFundraisingOpen} />
      <EventModal open={eventOpen} onOpenChange={setEventOpen} />
    </section>
  );
};

export default GetInvolvedSection;