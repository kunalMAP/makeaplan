
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Briefcase, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  const teams = [
    { name: 'Engineering', description: 'Build and improve our platform' },
    { name: 'Product', description: 'Define and refine user experiences' },
    { name: 'Design', description: 'Create beautiful interfaces' },
    { name: 'Marketing', description: 'Spread the word about Make A Plan' },
    { name: 'Customer Support', description: 'Help users get the most out of our platform' },
    { name: 'Operations', description: 'Keep everything running smoothly' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[40vh] bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team collaboration" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="text-center text-white z-10 px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl max-w-2xl mx-auto">
                Help us connect people through shared experiences and build community.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Join Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Make A Plan?</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              We're on a mission to bring people together through events and shared experiences.
              Join us in creating technology that fosters real-world connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-accent/30 rounded-xl p-8 hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborative Culture</h3>
              <p className="text-secondary">Work with passionate people who value teamwork and mutual support.</p>
            </div>
            
            <div className="bg-accent/30 rounded-xl p-8 hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Meaningful Impact</h3>
              <p className="text-secondary">Build products that help people connect and form communities around shared interests.</p>
            </div>
            
            <div className="bg-accent/30 rounded-xl p-8 hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Growth & Development</h3>
              <p className="text-secondary">Continuous learning opportunities and clear paths for career advancement.</p>
            </div>
          </div>
        </section>
        
        {/* Benefits */}
        <section className="py-16 bg-accent/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                'Competitive salary and equity',
                'Flexible remote work options',
                'Comprehensive health coverage',
                'Unlimited PTO policy',
                'Professional development stipend',
                'Mental health resources',
                'Wellness program',
                'Parental leave',
                'Home office setup'
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-primary/10 rounded-full">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Teams */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Teams</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, index) => (
              <div key={index} className="border border-border rounded-xl p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200">
                <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                <p className="text-secondary">{team.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Joining?</h2>
            <p className="text-lg mb-4">We're always looking for talented individuals to join our team.</p>
            <Button asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
