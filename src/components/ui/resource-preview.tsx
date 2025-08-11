import * as React from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
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
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80" side="top">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{title}</h4>
              {count && (
                <Badge variant="secondary" className="text-xs mt-1">
                  {count} Resources
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          
          {resources.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium text-foreground uppercase tracking-wide">
                Sample Resources
              </h5>
              <div className="space-y-1">
                {resources.slice(0, 3).map((resource, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{resource}</span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {type === 'featured' && (
            <div className="bg-gradient-hero rounded-lg p-3 text-white">
              <div className="text-center">
                <div className="text-sm font-semibold mb-1">50+ Pages</div>
                <div className="flex justify-center space-x-4 text-xs">
                  <div>1000+ Downloads</div>
                  <div>4.9/5 Rating</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}