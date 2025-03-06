
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-zinc max-w-none">
            <p className="text-secondary mb-6">
              Last Updated: June 10, 2023
            </p>
            
            <p className="mb-4">
              Make A Plan ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Make A Plan.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information We Collect</h2>
            
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account, create or join events, update your profile, interact with other users, or communicate with us.
            </p>
            
            <p className="mb-4">
              This information may include:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Personal identifiers (name, email address, phone number)</li>
              <li>Profile information (profile photo, bio, interests)</li>
              <li>Content you post (event details, comments, messages)</li>
              <li>Payment information (when applicable)</li>
              <li>Device and usage information (IP address, browser type, operating system)</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">How We Use Your Information</h2>
            
            <p className="mb-4">
              We use your information to:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Create and manage your account</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address fraud and other illegal activities</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Information Sharing</h2>
            
            <p className="mb-4">
              We may share your information with:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Other users (as necessary for the functionality of the platform)</li>
              <li>Service providers (for hosting, payment processing, etc.)</li>
              <li>Professional advisors (lawyers, accountants, etc.)</li>
              <li>Government bodies (when required by law)</li>
              <li>In connection with a business transaction (merger, sale, etc.)</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Your Choices</h2>
            
            <p className="mb-4">
              You can access and update certain information about you from within your account settings. You can also request to have your account deleted by contacting us.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Data Security</h2>
            
            <p className="mb-4">
              We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Children's Privacy</h2>
            
            <p className="mb-4">
              Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Changes to This Policy</h2>
            
            <p className="mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">Contact Us</h2>
            
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            
            <p className="mb-4">
              Email: privacy@makeaplan.com<br />
              Address: 123 Plan Street, San Francisco, CA 94103
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
