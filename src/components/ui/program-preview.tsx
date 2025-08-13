import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { BookOpen, School, MessageCircle, HandHeart, Users } from 'lucide-react'

interface ProgramPreviewProps {
  children: React.ReactNode
  type: 'educational' | 'outreach' | 'counseling' | 'partnerships'
  title: string
  description: string
  features: string[]
  status: string
  participants: string
}

export function ProgramPreview({ 
  children, 
  type, 
  title, 
  description, 
  features,
  status,
  participants
}: ProgramPreviewProps) {
  const getIcon = () => {
    switch (type) {
      case 'educational':
        return BookOpen
      case 'outreach':
        return School
      case 'counseling':
        return MessageCircle
      case 'partnerships':
        return HandHeart
      default:
        return BookOpen
    }
  }

  const Icon = getIcon()

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-hero rounded-lg">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {status}
            </Badge>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Users className="h-3 w-3" />
              <span className="text-xs">{participants}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-foreground uppercase tracking-wide">
              Key Features
            </h5>
            <div className="space-y-1">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}