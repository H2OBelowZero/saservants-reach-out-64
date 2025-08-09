import { Button } from '@/components/ui/button';
import { Heart, MapPin, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Organization Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-accent rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SA Servants</h3>
                  <p className="text-primary-foreground/80 text-sm">Fighting Teenage Pregnancy Foundation</p>
                </div>
              </div>
              <p className="text-primary-foreground/90 mb-6 leading-relaxed max-w-md">
                Dedicated to empowering South African youth through education, support, and 
                community engagement to prevent teenage pregnancy and build brighter futures.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="text-sm text-primary-foreground/90">
                    9032 Stand Ext. 36, Olievenhoutbosch, Tshwane, 0175
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <a 
                    href="mailto:ltlushane56@gmail.com" 
                    className="text-sm text-primary-foreground/90 hover:text-accent transition-smooth"
                  >
                    ltlushane56@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'About Us', href: '#about' },
                  { name: 'Our Programs', href: '#programs' },
                  { name: 'Resources', href: '#resources' },
                  { name: 'Get Involved', href: '#get-involved' },
                  { name: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent transition-smooth text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support Our Work</h4>
              <p className="text-primary-foreground/80 text-sm mb-4">
                Help us continue making a difference in young people's lives.
              </p>
              <div className="space-y-3">
                <Button variant="warm" className="w-full">
                  Donate Now
                </Button>
                <Button variant="outline" className="w-full border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Volunteer
                </Button>
              </div>
              
              {/* Social Media */}
              <div className="mt-6">
                <h5 className="text-sm font-medium mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-accent hover:bg-primary-foreground/10">
                    <Instagram className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-primary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/80">
              © {currentYear} SA Servants Fights Against Teenage Pregnancy Foundation. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="text-primary-foreground/60">NPO: 320-188 NPO</span>
              <span className="text-primary-foreground/60">PBO: 930086288</span>
              <span className="text-primary-foreground/60">Tax: 9659941190</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-primary-foreground/60">
              SA Servants is a registered Non-Profit Organization committed to transparency and accountability.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;