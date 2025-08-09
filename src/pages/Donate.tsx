import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, CreditCard, Banknote, Shield, CheckCircle } from 'lucide-react';

const Donate = () => {
  const donationAmounts = [50, 100, 250, 500, 1000];
  const impactItems = [
    { amount: 50, impact: 'Provides educational materials for 2 students' },
    { amount: 100, impact: 'Sponsors a workshop session for 10 teenagers' },
    { amount: 250, impact: 'Covers counseling sessions for 5 young people' },
    { amount: 500, impact: 'Funds a complete school outreach program' },
    { amount: 1000, impact: 'Supports our programs for a full month' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Make a Difference</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Support Our Mission
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your donation helps us empower South African youth and prevent teenage pregnancy 
                through education, support, and community programs.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Donation Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span>Make a Donation</span>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Choose an amount below or enter a custom amount.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Amount Selection */}
                  <div className="space-y-3">
                    <Label>Select Amount (ZAR)</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {donationAmounts.map((amount) => (
                        <Button key={amount} variant="outline" className="h-12">
                          R{amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="customAmount">Custom Amount (ZAR)</Label>
                    <Input 
                      id="customAmount" 
                      type="number" 
                      placeholder="Enter amount" 
                      min="10"
                    />
                  </div>

                  {/* Donor Information */}
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

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit/Debit Card
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Banknote className="h-4 w-4 mr-2" />
                        Bank Transfer
                      </Button>
                    </div>
                  </div>

                  <Button variant="hero" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Your donation is secure and encrypted</span>
                  </div>
                </CardContent>
              </Card>

              {/* Impact & Information */}
              <div className="space-y-8">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Your Impact</CardTitle>
                    <p className="text-muted-foreground">
                      See how your donation makes a real difference.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {impactItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-secondary/30 rounded-lg">
                          <div className="flex-shrink-0 w-16 h-8 bg-primary text-white rounded text-sm font-semibold flex items-center justify-center">
                            R{item.amount}
                          </div>
                          <p className="text-sm text-foreground">{item.impact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Why Donate?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Registered NPO</p>
                          <p className="text-sm text-muted-foreground">Tax-deductible donations (Section 18A)</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Transparent Usage</p>
                          <p className="text-sm text-muted-foreground">95% goes directly to programs</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Regular Updates</p>
                          <p className="text-sm text-muted-foreground">Receive impact reports quarterly</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-hero text-white shadow-warm">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-bold mb-2">Other Ways to Help</h3>
                    <p className="text-white/90 text-sm mb-4">
                      Can't donate right now? You can still make a difference.
                    </p>
                    <div className="space-y-2">
                      <Button variant="warm" size="sm" className="w-full">
                        Volunteer Your Time
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-white text-white hover:bg-white hover:text-primary">
                        Share Our Mission
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;