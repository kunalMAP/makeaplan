
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Eventful
              </span>
            </Link>
            <p className="text-secondary max-w-md mb-6">
              A social platform that connects people through shared interests and events. Discover, join, or create your own experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-secondary hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-secondary hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-secondary hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-secondary hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-secondary hover:text-primary transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-secondary hover:text-primary transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-secondary hover:text-primary transition-colors">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} Eventful. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <select
              className="py-1 px-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
