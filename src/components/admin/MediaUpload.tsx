import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Image, Video, X, Calendar } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface FileWithPreview extends File {
  preview: string;
  id: string;
}

const MediaUpload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    event_type: 'workshop',
    event_category: 'education',
    organizer: '',
    attendees: 0,
    people_reached: 0,
    outcomes: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const fileType = file.type || '';
      const isImage = fileType.startsWith('image/');
      const isVideo = fileType.startsWith('video/');
      const isValidSize = isImage ? file.size <= 10 * 1024 * 1024 : file.size <= 100 * 1024 * 1024;
      
      if (!isImage && !isVideo) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a supported image or video format.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds the size limit.`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });

    const filesWithPreview = validFiles.map(file => ({
      ...file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));

    setFiles(prev => [...prev, ...filesWithPreview]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleUpload = async () => {
    if (!files.length) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!eventData.title || !eventData.event_date) {
      toast({
        title: "Missing Information",
        description: "Please provide at least the event title and date.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // First create the event
      const { data: event, error: eventError } = await supabase
        .from('events')
        .insert([{
          ...eventData,
          created_by: user?.id,
        }])
        .select()
        .single();

      if (eventError) {
        throw eventError;
      }

      // Upload files to Supabase Storage
      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `events/${event.id}/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Save media record to database
        const { error: mediaError } = await supabase
          .from('media')
          .insert([{
            event_id: event.id,
            file_name: fileName,
            file_type: file.type,
            file_size: file.size,
            file_url: publicUrl,
            alt_text: `${eventData.title} - ${file.name}`,
            uploaded_by: user?.id,
          }]);

        if (mediaError) {
          throw mediaError;
        }

        return publicUrl;
      });

      await Promise.all(uploadPromises);

      toast({
        title: "Upload Successful!",
        description: `Event "${eventData.title}" and ${files.length} media files have been uploaded successfully.`,
      });

      // Reset form
      setFiles([]);
      setEventData({
        title: '',
        description: '',
        event_date: '',
        location: '',
        event_type: 'workshop',
        event_category: 'education',
        organizer: '',
        attendees: 0,
        people_reached: 0,
        outcomes: '',
      });

    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Event Media
          </CardTitle>
          <CardDescription>
            Upload photos and videos from your events along with event information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* File Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-primary">Drop the files here...</p>
            ) : (
              <div>
                <p className="text-lg mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">
                  Supports: Images (JPG, PNG, GIF, WebP - max 10MB) and Videos (MP4, MOV, AVI, WebM - max 100MB)
                </p>
              </div>
            )}
          </div>

          {/* File Preview */}
          {files.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Selected Files ({files.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border">
                      {(file.type || '').startsWith('image/') ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="text-xs mt-1 truncate" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Information Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Event Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={eventData.title}
                  onChange={(e) => setEventData({...eventData, title: e.target.value})}
                  placeholder="Community Workshop on Teenage Pregnancy Prevention"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="event_date">Event Date *</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={eventData.event_date}
                  onChange={(e) => setEventData({...eventData, event_date: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={eventData.location}
                  onChange={(e) => setEventData({...eventData, location: e.target.value})}
                  placeholder="Community Center, Olievenhoutbosch"
                />
              </div>
              
              <div>
                <Label htmlFor="event_type">Event Type</Label>
                <Select onValueChange={(value) => setEventData({...eventData, event_type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
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
                  value={eventData.attendees}
                  onChange={(e) => setEventData({...eventData, attendees: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  value={eventData.description}
                  onChange={(e) => setEventData({...eventData, description: e.target.value})}
                  placeholder="Describe what happened at this event, its purpose, and impact..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={uploading || !files.length}
            className="w-full"
            size="lg"
          >
            {uploading ? "Uploading..." : `Upload Event & ${files.length} File${files.length !== 1 ? 's' : ''}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaUpload;