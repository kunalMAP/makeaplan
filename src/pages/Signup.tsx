
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  
  // Password validation
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasNumber: false,
    hasUpperCase: false,
  });
  
  useEffect(() => {
    setPasswordStrength({
      length: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasUpperCase: /[A-Z]/.test(password),
    });
  }, [password]);

  // Check if all password requirements are met
  const isPasswordValid = Object.values(passwordStrength).every(Boolean);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    if (!isPasswordValid) {
      toast({
        title: "Error",
        description: "Password does not meet requirements",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await signup(name, email, password);
      // No need to navigate here as the useEffect will handle it
    } catch (error) {
      // Error toast is shown in the signup function
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AuthLayout 
      title="Create an account"
      subtitle="Sign up to get started with Make A Plan"
      type="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            placeholder="John Doe"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
            placeholder="your@email.com"
            required
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              {passwordStrength.length ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <AlertCircle className="h-3 w-3 text-gray-400" />
              )}
              <span className={passwordStrength.length ? "text-green-500" : "text-gray-500"}>
                At least 6 characters
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              {passwordStrength.hasNumber ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <AlertCircle className="h-3 w-3 text-gray-400" />
              )}
              <span className={passwordStrength.hasNumber ? "text-green-500" : "text-gray-500"}>
                At least 1 number
              </span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              {passwordStrength.hasUpperCase ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <AlertCircle className="h-3 w-3 text-gray-400" />
              )}
              <span className={passwordStrength.hasUpperCase ? "text-green-500" : "text-gray-500"}>
                At least 1 uppercase letter
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pr-10"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
          )}
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isPasswordValid || password !== confirmPassword}
          >
            {isSubmitting ? 'Creating account...' : 'Sign up'}
          </Button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            type="button"
            className="py-2 px-4 border rounded-md flex items-center justify-center space-x-2 hover:bg-accent transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            <span>Google</span>
          </button>
          
          <button
            type="button"
            className="py-2 px-4 border rounded-md flex items-center justify-center space-x-2 hover:bg-accent transition-colors"
            disabled={isSubmitting}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M9.5 3h5c.3 0 .5.2.5.5v0c0 .3-.2.5-.5.5h-5c-.3 0-.5-.2-.5-.5v0c0-.3.2-.5.5-.5z"
                fill="currentColor"
              />
              <path
                d="M12 11c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z"
                fill="currentColor"
              />
              <path
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span>GitHub</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Terms of Service and Privacy Policy
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
