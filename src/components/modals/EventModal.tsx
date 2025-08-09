import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface EventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventModal = ({ open, onOpenChange }: EventModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    experience: '',
    availability: '',
    leadership: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event Organizer Application Sent!",
      description: "We're excited about your interest in organizing events. We'll contact you soon!",
    });
    onOpenChange(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      experience: '',
      availability: '',
      leadership: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Event Organizer Application</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div>
            <Label htmlFor="eventType">Event Interest</Label>
            <Select onValueChange={(value) => setFormData({...formData, eventType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="What events would you like to organize?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshops">Educational Workshops</SelectItem>
                <SelectItem value="awareness">Awareness Campaigns</SelectItem>
                <SelectItem value="fundraising">Fundraising Events</SelectItem>
                <SelectItem value="community">Community Outreach</SelectItem>
                <SelectItem value="training">Training Sessions</SelectItem>
                <SelectItem value="all">All Types</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="experience">Event Planning Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="Describe your event planning experience..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="availability">Time Commitment</Label>
            <Select onValueChange={(value) => setFormData({...formData, availability: value})}>
              <SelectTrigger>
                <SelectValue placeholder="How much time can you commit monthly?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5-10">5-10 hours/month</SelectItem>
                <SelectItem value="10-20">10-20 hours/month</SelectItem>
                <SelectItem value="20+">20+ hours/month</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="leadership"
              checked={formData.leadership}
              onCheckedChange={(checked) => setFormData({...formData, leadership: checked as boolean})}
            />
            <Label htmlFor="leadership" className="text-sm">
              I'm interested in taking a leadership role
            </Label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Apply
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;