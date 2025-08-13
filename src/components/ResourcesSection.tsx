import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResourcePreview } from '@/components/ui/resource-preview';
import { FileText, Video, Image, ExternalLink, Download, Eye } from 'lucide-react';

const ResourcesSection = () => {
  const resourceCategories = [
    {
      icon: FileText,
      title: 'Educational Articles',
      count: '25+',
      description: 'Comprehensive guides on reproductive health, career planning, and life skills.',
      resources: [
        'Understanding Teenage Development',
        'Sexual Health Education Guide',
        'Career Planning for Youth',
        'Building Self-Esteem and Confidence'
      ]
    },
    {
      icon: Video,
      title: 'Video Resources',
      count: '15+',
      description: 'Engaging video content featuring expert talks and peer discussions.',
      resources: [
        'Teen Health and Wellness Series',
        'Real Stories from Young People',
        'Expert Interviews on Prevention',
        'Interactive Q&A Sessions'
      ]
    },
    {
      icon: Image,
      title: 'Infographics',
      count: '30+',
      description: 'Visual resources that make complex information accessible and shareable.',
      resources: [
        'Prevention Statistics SA',
        'Healthy Relationship Guidelines',
        'Future Planning Roadmaps',
        'Support System Networks'
      ]
    }
  ];

  const externalResources = [
    {
      title: 'Department of Health SA',
      description: 'Official reproductive health resources',
      url: '#'
    },
    {
      title: 'Love Life Organization',
      description: 'Youth-focused health initiatives',
      url: '#'
    },
    {
      title: 'Soul City Institute',
      description: 'Health communication resources',
      url: '#'
    }
  ];

  return (
    <section id="resources" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Educational Resources</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Knowledge is Power
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access our comprehensive library of educational materials designed to inform, 
            educate, and empower young people and their communities.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {resourceCategories.map((category, index) => {
            const getPreviewType = (title: string) => {
              if (title.includes('Educational')) return 'educational';
              if (title.includes('Video')) return 'video';
              if (title.includes('Infographics')) return 'infographic';
              return 'educational';
            };

            return (
              <ResourcePreview
                key={index}
                type={getPreviewType(category.title)}
                title={category.title}
                description={category.description}
                count={category.count}
                resources={category.resources}
              >
                <Card className="shadow-card hover:shadow-warm transition-smooth group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-hero rounded-lg group-hover:scale-110 transition-bounce">
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground">{category.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {category.count} Resources
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {category.resources.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-smooth">
                          <span className="text-sm text-foreground">{resource}</span>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="subtle" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </ResourcePreview>
            );
          })}
        </div>

        {/* Featured Resource */}
        <ResourcePreview
          type="featured"
          title="Comprehensive Teen Health Guide"
          description="Our most comprehensive resource covering all aspects of teenage development, reproductive health, and future planning. This guide has been developed in collaboration with healthcare professionals and educators."
          resources={[]}
        >
          <Card className="mb-16 shadow-card cursor-pointer hover:shadow-warm transition-smooth">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="outline" className="mb-4">Featured Resource</Badge>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Comprehensive Teen Health Guide
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Our most comprehensive resource covering all aspects of teenage development, 
                    reproductive health, and future planning. This guide has been developed in 
                    collaboration with healthcare professionals and educators.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="hero">
                      <Download className="h-4 w-4 mr-2" />
                      Download Guide
                    </Button>
                    <Button variant="subtle">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Online
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-hero rounded-lg p-8 text-white">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <h4 className="text-xl font-semibold mb-2">50+ Pages</h4>
                    <p className="text-white/80 mb-4">
                      Evidence-based content reviewed by medical professionals
                    </p>
                    <div className="flex justify-center space-x-4 text-sm">
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
              </div>
            </CardContent>
          </Card>
        </ResourcePreview>

        {/* External Resources */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Partner Resources</CardTitle>
            <p className="text-muted-foreground">
              Additional resources from our trusted partners and health organizations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {externalResources.map((resource, index) => (
                <div key={index} className="p-4 border border-border rounded-lg hover:shadow-soft transition-smooth">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">{resource.title}</h5>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ResourcesSection;