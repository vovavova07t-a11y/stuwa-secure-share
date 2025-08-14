
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AuthModal } from '@/components/AuthModal';
import { FileUploadZone } from '@/components/FileUploadZone';
import { SecuritySection } from '@/components/SecuritySection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Files uploaded:', files);
    // Here would be the actual file upload logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection onGetStarted={() => setIsAuthModalOpen(true)} />
        
        {/* File Upload Section - Show only when authenticated */}
        {isAuthenticated && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                    Загрузка файлов
                  </h2>
                  <p className="text-xl text-muted-foreground animate-fade-in animate-stagger-1">
                    Безопасно загружайте и делитесь файлами с вашей командой
                  </p>
                </div>
                
                <div className="animate-slide-up animate-stagger-2">
                  <FileUploadZone onFileUpload={handleFileUpload} />
                </div>
              </div>
            </div>
          </section>
        )}
        
        <SecuritySection />
      </main>
      
      <Footer />
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
