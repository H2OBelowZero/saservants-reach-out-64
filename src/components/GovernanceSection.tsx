import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Calendar, FileText, Shield, Download } from 'lucide-react';

const GovernanceSection = () => {
  const boardStructure = [
    { role: 'Chairperson', responsibilities: 'Strategic leadership and board oversight' },
    { role: 'Treasurer', responsibilities: 'Financial management and budget oversight' },
    { role: 'Secretary', responsibilities: 'Record keeping and communication coordination' },
  ];

  const meetingTypes = [
    { type: 'Annual General Meeting (AGM)', frequency: 'Yearly', notice: '14 days', quorum: '50%+1' },
    { type: 'Special General Meeting (SGM)', frequency: 'As needed', notice: '14 days', quorum: '2/3 for constitutional changes' },
    { type: 'Ordinary Board Meetings', frequency: 'Quarterly', notice: '7 days', quorum: '50%+1' },
  ];

  const financialGuidelines = [
    'Independent audit within 6 months of year-end (31 March)',
    'Bank account signatories: Chairperson + any 2 Board members',
    'No profit distribution to members - strict asset lock',
    'Investments only with registered financial institutions',
  ];

  return (
    <section id="governance" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">Governance & Transparency</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Governance Structure
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SSFATPF operates under strict governance principles with transparent decision-making, 
            financial accountability, and democratic leadership structures.
          </p>
        </div>

        {/* Board Structure */}
        <Card className="mb-12 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Board of Governance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {boardStructure.map((position, index) => (
                <div key={index} className="text-center p-4 bg-secondary/50 rounded-lg">
                  <h4 className="text-lg font-semibold text-foreground mb-2">{position.role}</h4>
                  <p className="text-sm text-muted-foreground">{position.responsibilities}</p>
                  <Badge variant="outline" className="mt-2">2-year term</Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Term Limits:</strong> 2 years, renewable indefinitely. Automatic removal after 3 consecutive missed meetings without leave.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Structure */}
        <Card className="mb-12 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Meeting Structure & Procedures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-foreground">Meeting Type</th>
                    <th className="text-left py-3 text-foreground">Frequency</th>
                    <th className="text-left py-3 text-foreground">Notice Period</th>
                    <th className="text-left py-3 text-foreground">Quorum</th>
                  </tr>
                </thead>
                <tbody>
                  {meetingTypes.map((meeting, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-3 text-foreground font-medium">{meeting.type}</td>
                      <td className="py-3 text-muted-foreground">{meeting.frequency}</td>
                      <td className="py-3 text-muted-foreground">{meeting.notice}</td>
                      <td className="py-3 text-muted-foreground">{meeting.quorum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Decision Making</h5>
                <p className="text-sm text-muted-foreground">
                  Consensus preferred; simple majority vote if needed. Chairperson has casting vote.
                </p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h5 className="font-semibold text-foreground mb-2">Notice Requirements</h5>
                <p className="text-sm text-muted-foreground">
                  All meeting notices must be in writing (email/SMS acceptable).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Accountability */}
        <Card className="mb-12 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Financial Accountability</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-foreground">{guideline}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <h5 className="font-semibold text-foreground mb-2">Asset Protection</h5>
              <p className="text-sm text-muted-foreground">
                All funds and assets are permanently locked for charitable purposes. No member can 
                receive any portion of the organization's assets, ensuring your donations directly 
                benefit our mission.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Constitutional Documents */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Constitutional Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-foreground mb-3">Available Documents</h5>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Constitution (Adopted 29 March 2025)</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Annual Financial Report</span>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Meeting Minutes Archive</span>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-3">Constitutional Changes</h5>
                <p className="text-sm text-muted-foreground mb-4">
                  Any amendments to the constitution require a 2/3 majority vote at an AGM or SGM 
                  with 14-day prior written notice. No amendments that would cause the organization 
                  to cease functioning are permitted.
                </p>
                <div className="p-3 bg-primary/10 rounded border border-primary/20">
                  <p className="text-xs text-foreground font-medium">
                    Dissolution requires 2/3 vote. Remaining assets go to similar non-profit.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovernanceSection;