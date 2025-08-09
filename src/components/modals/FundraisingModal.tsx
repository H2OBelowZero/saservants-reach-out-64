import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FundraisingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FundraisingModal = ({ open, onOpenChange }: FundraisingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    campaignType: '',
    experience: '',
    ideas: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Fundraising Application Received!",
      description: "Thank you for wanting to help us raise funds. We'll be in touch soon!",
    });
    onOpenChange(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      campaignType: '',
      experience: '',
      ideas: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Join Fundraising Team</DialogTitle>
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
            <Label htmlFor="campaignType">Campaign Interest</Label>
            <Select onValueChange={(value) => setFormData({...formData, campaignType: value})}>
              <SelectTrigger>
                <SelectValue placeholder="What type of fundraising?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="events">Fundraising Events</SelectItem>
                <SelectItem value="online">Online Campaigns</SelectItem>
                <SelectItem value="corporate">Corporate Partnerships</SelectItem>
                <SelectItem value="grants">Grant Writing</SelectItem>
                <SelectItem value="community">Community Drives</SelectItem>
                <SelectItem value="all">All Types</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="experience">Fundraising Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({...formData, experience: e.target.value})}
              placeholder="Tell us about your fundraising or marketing experience..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="ideas">Campaign Ideas</Label>
            <Textarea
              id="ideas"
              value={formData.ideas}
              onChange={(e) => setFormData({...formData, ideas: e.target.value})}
              placeholder="Share any fundraising ideas you have..."
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Join Team
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FundraisingModal;