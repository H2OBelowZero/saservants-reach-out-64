import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Plus, Edit, Eye, Trash, Calendar } from 'lucide-react';
import BlogPostModal from '../modals/BlogPostModal';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
  event_id: string | null;
  events?: {
    title: string;
  };
}

const BlogManagement = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          events (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (postId: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updateData)
        .eq('id', postId);

      if (error) {
        throw error;
      }

      toast({
        title: "Status Updated",
        description: `Blog post ${newStatus === 'published' ? 'published' : 'updated'} successfully.`,
      });

      fetchBlogPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update blog post status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) {
        throw error;
      }

      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been successfully deleted.",
      });

      fetchBlogPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete blog post.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Management</h2>
          <p className="text-muted-foreground">Manage your foundation's blog posts and stories</p>
        </div>
        
        <Button onClick={() => setBlogModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Write New Post
        </Button>
      </div>

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 gap-6">
        {blogPosts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Blog Posts Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start sharing your foundation's impact by writing your first blog post.
              </p>
              <Button onClick={() => setBlogModalOpen(true)}>
                Write First Post
              </Button>
            </CardContent>
          </Card>
        ) : (
          blogPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <Badge variant={getStatusBadgeVariant(post.status)}>
                        {post.status}
                      </Badge>
                    </div>
                    
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created: {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      {post.published_at && (
                        <span className="flex items-center gap-1">
                          Published: {new Date(post.published_at).toLocaleDateString()}
                        </span>
                      )}
                      {post.events && (
                        <span className="text-primary">
                          Related to: {post.events.title}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2">
                    {post.status === 'published' && (
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                )}
                
                <div className="flex gap-2">
                  {post.status === 'draft' && (
                    <Button 
                      size="sm"
                      onClick={() => handleStatusChange(post.id, 'published')}
                    >
                      Publish Post
                    </Button>
                  )}
                  
                  {post.status === 'published' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(post.id, 'archived')}
                    >
                      Archive Post
                    </Button>
                  )}
                  
                  {post.status === 'archived' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleStatusChange(post.id, 'published')}
                    >
                      Republish
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Blog Post Modal */}
      <BlogPostModal
        open={blogModalOpen}
        onOpenChange={setBlogModalOpen}
      />
    </div>
  );
};

export default BlogManagement;