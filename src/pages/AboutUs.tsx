
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Calendar, MessageSquare, Globe, Heart, Shield } from 'lucide-react';

const AboutUs: React.FC = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[40vh] bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="People at Event" className="w-full h-full object-cover" />
            </div>
            <div className="text-center text-white z-10 px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Make A Plan</h1>
              <p className="text-xl max-w-2xl mx-auto">Connecting people through meaningful events and shared experiences.</p>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              At Make A Plan, we believe in the power of community. Our mission is to create a platform where people can discover, 
              create, and join events that align with their interests, fostering meaningful connections and shared experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-accent/30 rounded-xl p-8 text-center hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Communities</h3>
              <p className="text-secondary">We bring together like-minded individuals through curated events and experiences.</p>
            </div>
            
            <div className="bg-accent/30 rounded-xl p-8 text-center hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simplify Event Planning</h3>
              <p className="text-secondary">Our platform makes it easy to create, manage, and discover events of all types.</p>
            </div>
            
            <div className="bg-accent/30 rounded-xl p-8 text-center hover-scale">
              <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Reach</h3>
              <p className="text-secondary">Our platform connects event organizers and attendees across the globe.</p>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        
        
        {/* Our Values */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Community First</h3>
                <p className="text-secondary">
                  We believe in prioritizing the needs of our community members, creating a platform that truly serves event hosts and attendees.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Trust & Safety</h3>
                <p className="text-secondary">
                  We are committed to creating a secure environment where users can connect with confidence and peace of mind.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
                <p className="text-secondary">
                  We strive to make our platform accessible and welcoming to people from all backgrounds and communities.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Clear Communication</h3>
                <p className="text-secondary">
                  We value transparent and effective communication between our platform, event organizers, and attendees.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};

export default AboutUs;
