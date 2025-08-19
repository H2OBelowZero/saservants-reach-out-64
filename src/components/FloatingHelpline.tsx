import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, X, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const FloatingHelpline = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button 
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-destructive hover:bg-destructive/90 z-50 animate-pulse"
            size="icon"
          >
            <Phone className="h-6 w-6 text-destructive-foreground" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-destructive">
              <Phone className="h-5 w-5" />
              <span>Emergency Support</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-destructive/10 p-4 rounded-lg">
              <h3 className="font-semibold text-destructive mb-2">24/7 Helpline</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our trained counselors are available around the clock to provide confidential support, guidance, and crisis intervention.
              </p>
              <Button 
                className="w-full bg-destructive hover:bg-destructive/90"
                asChild
              >
                <a href="tel:+27823518288" className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call 082 351 8288</span>
                </a>
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">WhatsApp Support</p>
                  <p className="text-xs text-muted-foreground">Chat with our counselors</p>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p><strong>Available for:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Crisis intervention and emotional support</li>
                  <li>Teenage pregnancy counseling</li>
                  <li>Referrals to local resources</li>
                  <li>Educational guidance</li>
                  <li>Family planning information</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                All conversations are confidential and free of charge
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingHelpline;