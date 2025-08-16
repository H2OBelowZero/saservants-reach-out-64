import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "SSFATPF Launches New Youth Education Program in Tshwane",
      excerpt: "Our organization has successfully launched a comprehensive education program reaching 50+ youth across 3 schools in the Tshwane area.",
      date: "2025-01-15",
      author: "SSFATPF Team",
      category: "Program Launch",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "Community Workshop on Teenage Pregnancy Prevention",
      excerpt: "Last week's community workshop saw over 100 parents and guardians attend our educational session on supporting youth reproductive health.",
      date: "2025-01-10",
      author: "Education Team",
      category: "Community Outreach",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Partnership with Local Healthcare Clinics Established",
      excerpt: "We've formed strategic partnerships with 5 local healthcare facilities to provide better access to youth-friendly services.",
      date: "2025-01-05",
      author: "Partnerships Team",
      category: "Partnerships",
      readTime: "2 min read"
    },
    {
      id: 4,
      title: "SSFATPF Officially Registered as Non-Profit Company",
      excerpt: "We're proud to announce our official registration as a Non-Profit Company, marking a significant milestone in our journey.",
      date: "2024-12-20",
      author: "Executive Team",
      category: "Organization",
      readTime: "3 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Program Launch": return "bg-blue-100 text-blue-800";
      case "Community Outreach": return "bg-green-100 text-green-800";
      case "Partnerships": return "bg-purple-100 text-purple-800";
      case "Organization": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-hero py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Latest News & Updates
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Stay informed about our latest initiatives, partnerships, and impact in the fight against teenage pregnancy.
            </p>
          </div>
        </section>

        {/* News Articles */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {newsArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;