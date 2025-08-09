import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Navigation } from 'lucide-react';

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MapModal = ({ open, onOpenChange }: MapModalProps) => {
  const address = "9032 Stand Ext. 36, Olievenhoutbosch, Tshwane, 0175, South Africa";
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            SA Servants Office Location
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-sage-light rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Office Address</h3>
            <p className="text-muted-foreground">
              9032 Stand Ext. 36<br />
              Olievenhoutbosch<br />
              Tshwane, 0175<br />
              South Africa
            </p>
          </div>
          
          {/* Embedded Google Map */}
          <div className="w-full h-64 rounded-lg overflow-hidden border">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCqMpfUPeRccMc8d3RiJWcbLfVuWHqnZiM&q=${encodedAddress}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SA Servants Office Location"
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="default" 
              className="flex-1" 
              onClick={() => window.open(directionsUrl, '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open(googleMapsUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View in Maps
            </Button>
          </div>
          
          <Button 
            variant="subtle" 
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;