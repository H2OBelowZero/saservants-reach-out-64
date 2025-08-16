import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p>By accessing and using the SSFATPF website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use of Website</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>You may use our website for lawful purposes only. You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Submit false or misleading information</li>
                  <li>Interfere with the website's operation</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the website for commercial purposes without permission</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Donations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All donations are voluntary and non-refundable unless required by law. Donations will be used to support our mission of fighting teenage pregnancy and supporting youth education.</p>
                <p>We will provide tax receipts for donations as required by South African law.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Content and Copyright</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>All content on this website is owned by SSFATPF or used with permission. You may not reproduce, distribute, or use our content without written permission.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>The information on this website is provided "as is" without warranties of any kind. We strive for accuracy but cannot guarantee that all information is current or error-free.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>SSFATPF shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>These terms are governed by the laws of South Africa. Any disputes will be resolved in the courts of South Africa.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>For questions about these terms, contact us:</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p><strong>Email:</strong> legal@ssfatpf.org.za</p>
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

export default TermsOfService;