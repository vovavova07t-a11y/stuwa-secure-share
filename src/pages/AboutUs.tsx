
import React from 'react';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FinancialDashboard } from '@/components/FinancialDashboard';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <FinancialDashboard />
      
      <Footer />
    </div>
  );
};

export default AboutUs;
