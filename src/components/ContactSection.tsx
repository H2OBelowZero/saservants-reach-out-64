import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Mail, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our programs or want to get involved? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Visit Our Office</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium text-foreground">SA Servants Foundation</p>
                  <p className="text-muted-foreground">
                    9032 Stand Ext. 36<br />
                    Olievenhoutbosch<br />
                    Tshwane, 0175<br />
                    South Africa
                  </p>
                </div>
                <div className="mt-6">
                  <Button variant="subtle" className="w-full">
                    <MapPin className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email Us</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">General Inquiries</p>
                    <a 
                      href="mailto:ltlushane56@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      ltlushane56@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Program Information</p>
                    <a 
                      href="mailto:ltlushane56@gmail.com" 
                      className="text-primary hover:underline"
                    >
                      ltlushane56@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Office Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium text-foreground">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium text-foreground">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium text-foreground">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Emergency support available 24/7 through our partner organizations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Your last name" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" type="tel" placeholder="+27 12 345 6789" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's your message about?" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us how we can help you..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button variant="hero" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                By sending this message, you agree to our privacy policy and terms of service.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contact Info */}
        <Card className="mt-12 bg-gradient-hero text-white shadow-warm">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-3">Need Immediate Support?</h3>
            <p className="text-white/90 mb-4">
              If you or someone you know needs immediate help, please contact one of our crisis support partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="warm">
                Crisis Helpline: 0800 123 456
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                24/7 Support Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;