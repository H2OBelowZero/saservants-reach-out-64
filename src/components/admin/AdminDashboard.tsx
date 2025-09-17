import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useDonations } from '@/hooks/useDonations';
import { Navigate } from 'react-router-dom';
import { 
  Upload, 
  Users, 
  Calendar, 
  DollarSign, 
  Image, 
  FileText,
  MessageSquare,
  Settings,
  TrendingUp
} from 'lucide-react';
import MediaUpload from './MediaUpload';
import EventManagement from './EventManagement';
import BlogManagement from './BlogManagement';

const AdminDashboard = () => {
  const { user, profile, loading, hasWriteAccess } = useAuth();
  const { eventStats } = useEvents();
  const { totalDonations, donationCount } = useDonations();
  const [activeTab, setActiveTab] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !hasWriteAccess) {
    return <Navigate to="/auth/login" replace />;
  }

  const statsCards = [
    {
      title: 'Total Events',
      value: eventStats.totalEvents,
      description: 'Events organized to date',
      icon: Calendar,
    },
    {
      title: 'People Reached',
      value: eventStats.totalPeopleReached?.toLocaleString() || '0',
      description: 'Community members impacted',
      icon: Users,
    },
    {
      title: 'Total Donations',
      value: `R ${totalDonations?.toLocaleString() || '0'}`,
      description: 'Funds raised for the cause',
      icon: DollarSign,
    },
    {
      title: 'Donation Count',
      value: donationCount || 0,
      description: 'Number of donations received',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || user.email}
          </h1>
          <p className="text-muted-foreground">
            Manage your foundation's content and track impact
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[500px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to manage your foundation's content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    onClick={() => setActiveTab('media')}
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    Upload Media
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('events')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <Calendar className="h-6 w-6" />
                    Add Event
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('blog')}
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <FileText className="h-6 w-6" />
                    Write Blog
                  </Button>
                  <Button 
                    variant="outline"
                    className="h-20 flex flex-col items-center gap-2"
                  >
                    <MessageSquare className="h-6 w-6" />
                    View Messages
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates from your foundation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventStats.latestEventDate && (
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Latest Event</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(eventStats.latestEventDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Community Impact</p>
                      <p className="text-sm text-muted-foreground">
                        {eventStats.totalPeopleReached} people reached through our programs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <EventManagement />
          </TabsContent>

          <TabsContent value="media">
            <MediaUpload />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Manage your account and foundation settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Account Information</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your account details and permissions
                    </p>
                    <div className="space-y-2">
                      <p><strong>Name:</strong> {profile?.full_name || 'Not set'}</p>
                      <p><strong>Email:</strong> {user?.email}</p>
                      <p><strong>Role:</strong> {profile?.role?.replace('_', ' ').toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;