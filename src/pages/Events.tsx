import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, Target, Plus, PenTool } from 'lucide-react';
import PostEventModal from '@/components/modals/PostEventModal';
import BlogPostModal from '@/components/modals/BlogPostModal';
import { useEvents } from '@/hooks/useEvents';
import { format } from 'date-fns';

const Events = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [selectedEventForBlog, setSelectedEventForBlog] = useState<{id: string, title: string} | null>(null);
  const { events, eventStats, isLoading } = useEvents();

  const getEventTypeColor = (type: string) => {
    const colors = {
      workshop: 'bg-primary/10 text-primary border-primary/20',
      awareness: 'bg-secondary/10 text-secondary border-secondary/20',
      community_outreach: 'bg-accent/10 text-accent border-accent/20',
      school_visit: 'bg-blue-100 text-blue-800 border-blue-200',
      training: 'bg-green-100 text-green-800 border-green-200',
      meeting: 'bg-purple-100 text-purple-800 border-purple-200',
      fundraising: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-neutral">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Our Events & Impact</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Follow our journey as we work to prevent teenage pregnancy and empower young people in South African communities.
            </p>
            
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-primary">{eventStats.totalEvents}</div>
                <div className="text-sm text-muted-foreground">Events Hosted</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-primary">{eventStats.totalAttendees}</div>
                <div className="text-sm text-muted-foreground">Direct Attendees</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-primary">{eventStats.totalPeopleReached}</div>
                <div className="text-sm text-muted-foreground">People Reached</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="text-2xl font-bold text-primary">2025</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
            </div>
            
            <Button onClick={() => setIsPostModalOpen(true)} className="mb-8">
              <Plus className="w-4 h-4 mr-2" />
              Post New Event
            </Button>
          </div>

          {/* Events List */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
              <p className="text-muted-foreground mb-6">
                We're just getting started! Post your first event to share our impact with the community.
              </p>
              <Button onClick={() => setIsPostModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Post First Event
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-primary">{event.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="w-4 h-4" />
                            {format(new Date(event.event_date), 'MMMM d, yyyy')}
                          </span>
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={getEventTypeColor(event.event_type)}>
                        {formatEventType(event.event_type)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    {event.description && (
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span><strong>{event.attendees}</strong> Direct Attendees</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-primary" />
                        <span><strong>{event.people_reached}</strong> People Reached</span>
                      </div>
                    </div>
                    
                    {event.outcomes && (
                      <div className="mt-4 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                        <h4 className="font-semibold text-sm mb-2">Key Outcomes & Impact:</h4>
                        <p className="text-sm text-muted-foreground">{event.outcomes}</p>
                      </div>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedEventForBlog({id: event.id, title: event.title});
                          setIsBlogModalOpen(true);
                        }}
                        className="w-full sm:w-auto"
                      >
                        <PenTool className="w-4 h-4 mr-2" />
                        Write Blog Post About This Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <PostEventModal 
        open={isPostModalOpen} 
        onOpenChange={setIsPostModalOpen} 
      />
      
      <BlogPostModal
        open={isBlogModalOpen}
        onOpenChange={(open) => {
          setIsBlogModalOpen(open);
          if (!open) setSelectedEventForBlog(null);
        }}
        relatedEventId={selectedEventForBlog?.id}
        relatedEventTitle={selectedEventForBlog?.title}
      />
    </div>
  );
};

export default Events;