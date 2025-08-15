import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useEvents } from '@/hooks/useEvents';

interface PostEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PostEventModal = ({ open, onOpenChange }: PostEventModalProps) => {
  const { toast } = useToast();
  const { submitEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    attendees: '',
    people_reached: '',
    event_type: '',
    outcomes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submitEvent({
      title: formData.title,
      description: formData.description,
      event_date: formData.event_date,
      location: formData.location,
      attendees: parseInt(formData.attendees) || 0,
      people_reached: parseInt(formData.people_reached) || 0,
      event_type: formData.event_type,
      outcomes: formData.outcomes
    });

    if (result.success) {
      toast({
        title: "Event Posted Successfully!",
        description: "Your event has been added to the events page.",
      });
      onOpenChange(false);
      setFormData({
        title: '',
        description: '',
        event_date: '',
        location: '',
        attendees: '',
        people_reached: '',
        event_type: '',
        outcomes: ''
      });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to post event. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">Post New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Community workshop on teenage pregnancy prevention"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="event_date">Event Date</Label>
            <Input
              id="event_date"
              type="date"
              value={formData.event_date}
              onChange={(e) => setFormData({...formData, event_date: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="event_type">Event Type</Label>
            <Select onValueChange={(value) => setFormData({...formData, event_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Educational Workshop</SelectItem>
                <SelectItem value="awareness">Awareness Campaign</SelectItem>
                <SelectItem value="community_outreach">Community Outreach</SelectItem>
                <SelectItem value="school_visit">School Visit</SelectItem>
                <SelectItem value="training">Training Session</SelectItem>
                <SelectItem value="meeting">Community Meeting</SelectItem>
                <SelectItem value="fundraising">Fundraising Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Olivenhoutbosch Community Center"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="attendees">Direct Attendees</Label>
              <Input
                id="attendees"
                type="number"
                value={formData.attendees}
                onChange={(e) => setFormData({...formData, attendees: e.target.value})}
                placeholder="25"
                min="0"
              />
            </div>
            
            <div>
              <Label htmlFor="people_reached">People Reached</Label>
              <Input
                id="people_reached"
                type="number"
                value={formData.people_reached}
                onChange={(e) => setFormData({...formData, people_reached: e.target.value})}
                placeholder="150"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe what happened at the event..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="outcomes">Key Outcomes & Impact</Label>
            <Textarea
              id="outcomes"
              value={formData.outcomes}
              onChange={(e) => setFormData({...formData, outcomes: e.target.value})}
              placeholder="What were the key results and impact of this event?"
              rows={3}
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Post Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostEventModal;