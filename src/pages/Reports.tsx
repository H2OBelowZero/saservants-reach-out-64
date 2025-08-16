import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "SSFATPF Annual Report 2024",
      description: "Comprehensive overview of our first year of operations, including program achievements, financial statements, and impact metrics.",
      type: "Annual Report",
      date: "2024-12-31",
      pages: 24,
      size: "2.3 MB",
      status: "Available"
    },
    {
      id: 2,
      title: "Financial Statements 2024",
      description: "Audited financial statements showing transparent use of donations and organizational expenses.",
      type: "Financial Report",
      date: "2024-12-31",
      pages: 12,
      size: "1.1 MB",
      status: "Available"
    },
    {
      id: 3,
      title: "Q4 2024 Impact Report",
      description: "Quarterly assessment of program effectiveness and youth reached through our initiatives.",
      type: "Impact Report",
      date: "2024-12-31",
      pages: 8,
      size: "850 KB",
      status: "Available"
    },
    {
      id: 4,
      title: "Strategic Plan 2025-2027",
      description: "Three-year strategic roadmap outlining our goals, objectives, and planned expansion across Gauteng province.",
      type: "Strategic Document",
      date: "2025-01-01",
      pages: 16,
      size: "1.8 MB",
      status: "Available"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Annual Report": return "bg-blue-100 text-blue-800";
      case "Financial Report": return "bg-green-100 text-green-800";
      case "Impact Report": return "bg-purple-100 text-purple-800";
      case "Strategic Document": return "bg-orange-100 text-orange-800";
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
              Reports & Documentation
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Access our annual reports, financial statements, and strategic documents demonstrating our commitment to transparency and accountability.
            </p>
          </div>
        </section>

        {/* Transparency Statement */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Commitment to Transparency
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As a registered Non-Profit Company, SSFATPF is committed to full transparency in our operations, 
              financial management, and impact reporting. All our reports are independently audited and available 
              for public review to ensure accountability to our donors, beneficiaries, and the broader community.
            </p>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {reports.map((report) => (
                <Card key={report.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <Badge className={getTypeColor(report.type)}>
                          {report.type}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        {report.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {report.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {report.description}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(report.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{report.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                        <span>{report.size}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4 border-t border-border">
                      <Button className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Request Information */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Need Additional Information?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <p className="text-muted-foreground">
                  Under the Promotion of Access to Information Act (PAIA), you have the right to request 
                  additional organizational information. We're committed to providing transparent access 
                  to our operations and governance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Download PAIA Manual
                  </Button>
                  <Button>
                    Submit Information Request
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p><strong>Information Officer:</strong> info@ssfatpf.org.za</p>
                  <p><strong>Response Time:</strong> 30 days as per PAIA requirements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;