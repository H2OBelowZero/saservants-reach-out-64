import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { PenTool, Calendar, Tag } from 'lucide-react';

interface BlogPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  relatedEventId?: string;
  relatedEventTitle?: string;
}

const BlogPostModal = ({ open, onOpenChange, relatedEventId, relatedEventTitle }: BlogPostModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: relatedEventTitle ? `Reflecting on ${relatedEventTitle}` : '',
    excerpt: '',
    content: '',
    category: relatedEventId ? 'event' : 'impact',
    tags: '',
    featured_image_url: '',
    status: 'draft' as 'draft' | 'published'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would integrate with your blog posts database
    // For now, we'll just show a success message
    
    const blogPost = {
      ...formData,
      event_id: relatedEventId || null,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author_id: 'current_user_id', // Would come from auth
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    console.log('Creating blog post:', blogPost);

    toast({
      title: formData.status === 'published' ? "Blog Post Published!" : "Draft Saved!",
      description: formData.status === 'published' 
        ? "Your blog post is now live on the website." 
        : "Your draft has been saved. You can publish it later.",
    });

    onOpenChange(false);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'impact',
      tags: '',
      featured_image_url: '',
      status: 'draft'
    });
  };

  const generateContentTemplate = () => {
    if (relatedEventId && relatedEventTitle) {
      const template = `We recently had the privilege of participating in "${relatedEventTitle}" and wanted to share the incredible impact this event had on our community.

## Event Highlights

[Describe the key moments and activities from the event]

## Community Impact

[Share specific stories about how the event affected participants and the broader community]

## Key Takeaways

[What did we learn? What messages resonated most with the audience?]

## Looking Forward

[How does this event contribute to our ongoing mission? What are the next steps?]

We're grateful to everyone who made this event possible and look forward to continuing our work in preventing teenage pregnancy and empowering young people across South Africa.`;
      
      setFormData(prev => ({ ...prev, content: template }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <PenTool className="w-5 h-5" />
            Write Blog Post
            {relatedEventTitle && (
              <span className="text-sm font-normal text-muted-foreground">
                • About {relatedEventTitle}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Share an inspiring title for your post..."
                required
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => setFormData({...formData, category: value})} value={formData.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="event">Event Recap</SelectItem>
                  <SelectItem value="impact">Impact Story</SelectItem>
                  <SelectItem value="education">Educational Content</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="success_story">Success Story</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="teenage pregnancy, education, community, prevention"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="excerpt">Excerpt (Brief Summary)</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="Write a compelling summary that will appear in blog previews..."
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="featured_image_url">Featured Image URL (Optional)</Label>
            <Input
              id="featured_image_url"
              value={formData.featured_image_url}
              onChange={(e) => setFormData({...formData, featured_image_url: e.target.value})}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="content">Blog Content</Label>
              {relatedEventId && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateContentTemplate}
                  className="text-primary"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Generate Event Template
                </Button>
              )}
            </div>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your blog post content here. You can use markdown formatting for headers (## Heading), lists, and emphasis (*italic*, **bold**)..."
              rows={12}
              className="font-mono text-sm"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Use ## for headings, * for bullet points, and **text** for bold formatting
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={(e) => {
                setFormData({...formData, status: 'draft'});
                handleSubmit(e as any);
              }}
              className="flex-1"
            >
              Save Draft
            </Button>
            <Button 
              type="submit" 
              onClick={() => setFormData({...formData, status: 'published'})}
              className="flex-1"
            >
              <Tag className="w-4 h-4 mr-2" />
              Publish Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;