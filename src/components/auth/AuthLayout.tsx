
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'login' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, type }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image/Branding */}
      <div className="hidden md:flex md:w-1/2 bg-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Make A Plan
          </h1>
          <p className="text-xl text-foreground/80 max-w-md">
            Join our community to discover and create exciting events with people who share your interests.
          </p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex flex-col p-6 md:p-12 justify-center max-w-md mx-auto w-full">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-secondary hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-secondary mt-1">{subtitle}</p>
        </div>

        {children}

        <div className="mt-8 text-center text-sm text-secondary">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
