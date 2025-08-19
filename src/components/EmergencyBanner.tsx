import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, X, AlertCircle } from 'lucide-react';

const EmergencyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-destructive text-destructive-foreground px-4 py-2 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <span className="font-semibold text-sm">Emergency Helpline Available</span>
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3" />
              <a 
                href="tel:+27823518288" 
                className="font-bold text-sm hover:underline"
              >
                082 351 8288
              </a>
              <span className="text-xs opacity-90">• 24/7 Support</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-destructive-foreground hover:bg-destructive-foreground/10 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default EmergencyBanner;