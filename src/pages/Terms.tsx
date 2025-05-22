
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-zinc max-w-none">
            <p className="text-secondary mb-6">
              Last Updated: May 15, 2025
            </p>
            
            <p className="mb-4">
              Please read these Terms of Service ("Terms") carefully before using the Make A Plan platform operated by Make A Plan, Inc. ("us", "we", or "our").
            </p>
            
            <p className="mb-4">
              Your access to and use of the service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
            
            <p className="mb-4">
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">2. Description of Service</h2>
            
            <p className="mb-4">
              Make A Plan provides a platform for discovering, creating, and joining events. Our service allows users to connect with others who share similar interests through various events and activities.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">3. User Accounts</h2>
            
            <p className="mb-4">
              When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            
            <p className="mb-4">
              You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password.
            </p>
            
            <p className="mb-4">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">4. User Content</h2>
            
            <p className="mb-4">
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>
            
            <p className="mb-4">
              By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service.
            </p>
            
            <p className="mb-4">
              You represent and warrant that: (i) the Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">5. Prohibited Activities</h2>
            
            <p className="mb-4">
              When using our Service, you agree not to:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Use the Service in any way that violates any applicable laws or regulations.</li>
              <li>Impersonate or attempt to impersonate the company, an employee, another user, or any other person.</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service.</li>
              <li>Use the Service to advertise or offer to sell goods and services without our prior written consent.</li>
              <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service.</li>
              <li>Use the Service to transmit any harmful or disruptive code.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">6. Intellectual Property</h2>
            
            <p className="mb-4">
              The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Make A Plan and its licensors.
            </p>
            
            <p className="mb-4">
              The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">7. Termination</h2>
            
            <p className="mb-4">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            
            <p className="mb-4">
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
            
            <p className="mb-4">
              In no event shall Make A Plan, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
            
            <p className="mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">10. Contact Us</h2>
            
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            
            <p className="mb-4">
              Email: legal@makeaplan.com<br />
              Address: 123 Plan Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
