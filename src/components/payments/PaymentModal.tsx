import React, { useState } from 'react';
import { X, CreditCard, CheckCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  price: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, eventTitle, price }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Show success message after a delay
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: `You have successfully joined: ${eventTitle}`,
        });
        onClose();
      }, 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={!isProcessing ? onClose : undefined}>
      <div 
        className="bg-white rounded-2xl w-full max-w-md overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">Join Plan</h2>
          {!isProcessing && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
              <p className="text-secondary mb-4">
                You have successfully joined the plan.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Event Details</h3>
                <p className="text-secondary mb-1">{eventTitle}</p>
                <p className="text-xl font-bold">${price}</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                        required
                      />
                      <CreditCard className="absolute right-3 top-2.5 w-5 h-5 text-secondary" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name on Card
                    </label>
                    <input
                      id="cardName"
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                        Expiry Date
                      </label>
                      <input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength={5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                        CVV
                      </label>
                      <input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg transition-colors ${
                      isProcessing 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Pay $${price}`}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
