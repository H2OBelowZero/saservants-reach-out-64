import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Video, Image, Download, Eye, Users } from 'lucide-react'

interface ResourcePreviewProps {
  children: React.ReactNode
  type: 'educational' | 'video' | 'infographic' | 'featured'
  title: string
  description: string
  count?: string
  resources?: string[]
}

export function ResourcePreview({ 
  children, 
  type, 
  title, 
  description, 
  count, 
  resources = [] 
}: ResourcePreviewProps) {
  const getIcon = () => {
    switch (type) {
      case 'educational':
        return FileText
      case 'video':
        return Video
      case 'infographic':
        return Image
      case 'featured':
        return FileText
      default:
        return FileText
    }
  }

  const Icon = getIcon()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <span>{title}</span>
              {count && (
                <Badge variant="secondary" className="text-xs ml-2">
                  {count} Resources
                </Badge>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          
          {resources.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-sm font-medium text-foreground uppercase tracking-wide">
                Available Resources
              </h5>
              <div className="space-y-2">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-smooth">
                    <span className="text-sm text-foreground">{resource}</span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {type === 'featured' && (
            <div className="bg-gradient-hero rounded-lg p-4 text-white">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">50+ Pages</div>
                <p className="text-white/80 mb-3 text-sm">
                  Evidence-based content reviewed by medical professionals
                </p>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">1000+</div>
                    <div className="text-white/70">Downloads</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">4.9/5</div>
                    <div className="text-white/70">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}