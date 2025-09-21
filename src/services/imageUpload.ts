/**
 * Image Upload Service
 * Handles image uploads and provides integration points for cloud storage providers
 */

interface UploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

class ImageUploadService {
  private readonly baseUrl: string;
  private readonly maxFileSize: number;
  private readonly allowedTypes: string[];

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
    this.allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  }

  /**
   * Validate file before upload
   */
  private validateFile(file: File): { valid: boolean; error?: string } {
    if (!this.allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.'
      };
    }

    if (file.size > this.maxFileSize) {
      return {
        valid: false,
        error: `File size too large. Maximum allowed size is ${this.maxFileSize / (1024 * 1024)}MB.`
      };
    }

    return { valid: true };
  }

  /**
   * Create a compressed version of the image
   */
  private async compressImage(file: File, maxWidth: number = 1920, quality: number = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        const newWidth = img.width * ratio;
        const newHeight = img.height * ratio;

        canvas.width = newWidth;
        canvas.height = newHeight;

        // Draw and compress
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }

  /**
   * Upload single image - Mock implementation
   * In production, this would upload to cloud storage (S3, Cloudinary, etc.)
   */
  async uploadImage(
    file: File, 
    folder: 'profiles' | 'portfolio' = 'portfolio',
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResponse> {
    // Validate file
    const validation = this.validateFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    try {
      // Compress image
      const compressedFile = await this.compressImage(file);
      
      // Mock upload progress
      if (onProgress) {
        const steps = [0, 25, 50, 75, 100];
        for (const step of steps) {
          setTimeout(() => {
            onProgress({
              loaded: step,
              total: 100,
              percentage: step
            });
          }, step * 10);
        }
      }

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful upload - in production, this would be the actual cloud storage URL
      const mockUrl = URL.createObjectURL(compressedFile);
      
      return {
        success: true,
        url: mockUrl
      };

      /* Production implementation example:
      const formData = new FormData();
      formData.append('image', compressedFile);
      formData.append('folder', folder);
      
      const response = await fetch(`${this.baseUrl}/upload/image`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      const result = await response.json();
      return result;
      */
      
    } catch (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Upload failed. Please try again.'
      };
    }
  }

  /**
   * Upload multiple images
   */
  async uploadMultipleImages(
    files: File[],
    folder: 'profiles' | 'portfolio' = 'portfolio',
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadResponse[]> {
    const results: UploadResponse[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await this.uploadImage(
        file, 
        folder, 
        onProgress ? (progress) => onProgress(i, progress) : undefined
      );
      results.push(result);
    }
    
    return results;
  }

  /**
   * Delete image - Mock implementation
   */
  async deleteImage(imageUrl: string): Promise<UploadResponse> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clean up blob URL if it's a local one
      if (imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
      
      return { success: true };
      
      /* Production implementation:
      const response = await fetch(`${this.baseUrl}/upload/image`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({ imageUrl })
      });
      
      return await response.json();
      */
      
    } catch (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: 'Failed to delete image. Please try again.'
      };
    }
  }

  /**
   * Get optimized image URL for different sizes
   */
  getOptimizedUrl(originalUrl: string, size: 'thumbnail' | 'medium' | 'large' = 'medium'): string {
    // Mock implementation - returns original URL
    // In production with cloud storage, this would return optimized URLs
    return originalUrl;
    
    /* Production implementation example:
    const sizeParams = {
      thumbnail: 'w_150,h_150,c_thumb',
      medium: 'w_500,h_500,c_limit',
      large: 'w_1200,h_1200,c_limit'
    };
    
    if (originalUrl.includes('cloudinary.com')) {
      return originalUrl.replace('/upload/', `/upload/${sizeParams[size]}/`);
    }
    
    return originalUrl;
    */
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadService();
export default imageUploadService;

// Export types
export type { UploadResponse, UploadProgress };