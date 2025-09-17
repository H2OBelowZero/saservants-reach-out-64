import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Plus, Edit, Trash, Users, MapPin } from 'lucide-react';
import BlogPostModal from '../modals/BlogPostModal';

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  event_type: string;
  attendees: number | null;
  people_reached: number | null;
  outcomes: string | null;
  created_at: string;
}

const EventManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    event_type: 'workshop',
    attendees: 0,
    people_reached: 0,
    outcomes: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        return;
      }

      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('events')
        .insert([{
          ...formData,
          created_by: user?.id,
        }]);

      if (error) {
        throw error;
      }

      toast({
        title: "Event Created!",
        description: "The event has been successfully added.",
      });

      setIsCreateOpen(false);
      setFormData({
        title: '',
        description: '',
        event_date: '',
        location: '',
        event_type: 'workshop',
        attendees: 0,
        people_reached: 0,
        outcomes: '',
      });
      
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create event.",
        variant: "destructive",
      });
    }
  };

  const handleCreateBlogPost = (event: Event) => {
    setSelectedEvent(event);
    setBlogModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Event Management</h2>
          <p className="text-muted-foreground">Manage your foundation's events and activities</p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Community Workshop on Prevention"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="event_date">Event Date *</Label>
                  <Input
                    id="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Community Center, Area"
                  />
                </div>
                
                <div>
                  <Label htmlFor="event_type">Event Type</Label>
                  <Select onValueChange={(value) => setFormData({...formData, event_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="outreach">Community Outreach</SelectItem>
                      <SelectItem value="counseling">Counseling Session</SelectItem>
                      <SelectItem value="partnership">Partnership Event</SelectItem>
                      <SelectItem value="fundraising">Fundraising</SelectItem>
                      <SelectItem value="awareness">Awareness Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="attendees">Attendees</Label>
                  <Input
                    id="attendees"
                    type="number"
                    value={formData.attendees}
                    onChange={(e) => setFormData({...formData, attendees: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the event purpose and activities..."
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 gap-6">
        {events.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by creating your first event to track your foundation's activities.
              </p>
              <Button onClick={() => setIsCreateOpen(true)}>
                Create First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          events.map((event) => (
            <Card key={event.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {event.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span>{new Date(event.event_date).toLocaleDateString()}</span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCreateBlogPost(event)}
                    >
                      Write Blog Post
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {event.description && (
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                )}
                
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {event.attendees || 0} attendees
                  </span>
                  <span>Type: {event.event_type.replace('_', ' ')}</span>
                  {event.people_reached && (
                    <span>{event.people_reached} people reached</span>
                  )}
                </div>
                
                {event.outcomes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Outcomes & Impact</h4>
                    <p className="text-sm text-muted-foreground">{event.outcomes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Blog Post Modal */}
      <BlogPostModal
        open={blogModalOpen}
        onOpenChange={setBlogModalOpen}
        relatedEventId={selectedEvent?.id}
        relatedEventTitle={selectedEvent?.title}
      />
    </div>
  );
};

export default EventManagement;