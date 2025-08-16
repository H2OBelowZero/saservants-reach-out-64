import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Contact us through our website forms</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in our programs or events</li>
                  <li>Make donations to our organization</li>
                  <li>Apply to volunteer with us</li>
                </ul>
                <p>This may include your name, email address, phone number, and any messages you send to us.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and provide support</li>
                  <li>Send you information about our programs and events</li>
                  <li>Process donations and issue receipts</li>
                  <li>Coordinate volunteer activities</li>
                  <li>Improve our services and website</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>With trusted service providers who assist us in operating our website</li>
                  <li>In anonymized form for research and statistical purposes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Under the Protection of Personal Information Act (POPIA), you have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p><strong>Email:</strong> privacy@ssfatpf.org.za</p>
                  <p><strong>Phone:</strong> +27 12 345 6789</p>
                  <p><strong>Address:</strong> 123 Education Street, Pretoria, Gauteng, 0001</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;