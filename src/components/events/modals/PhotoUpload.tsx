
import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PhotoUploadProps {
  onPhotoSelected: (photoUrl: string) => void;
  currentPhoto?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onPhotoSelected, currentPhoto }) => {
  const [preview, setPreview] = useState<string>(currentPhoto || '');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // For now, we'll use a placeholder service or convert to base64
      // In a real app, you'd upload to Supabase Storage or another service
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoSelected(result);
        
        toast({
          title: "Photo uploaded",
          description: "Your photo has been selected successfully",
        });
      };
      reader.readAsDataURL(file);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = () => {
    // For mobile devices, this will open the camera
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = () => {
    setPreview('');
    onPhotoSelected('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium mb-2">
        Event Photo
      </label>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Event preview" 
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemovePhoto}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove photo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Upload className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Upload Photo</span>
              </button>
              
              <button
                type="button"
                onClick={handleCameraCapture}
                disabled={isUploading}
                className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Camera className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Take Photo</span>
              </button>
            </div>
            
            <p className="text-xs text-gray-500">
              {isUploading ? 'Uploading...' : 'PNG, JPG, GIF up to 5MB'}
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;
