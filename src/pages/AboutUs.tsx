
import React from 'react';
import { Footer } from '@/components/Footer';
import { FinancialDashboard } from '@/components/FinancialDashboard';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">      
      <FinancialDashboard />
      
      <Footer />
    </div>
  );
};

export default AboutUs;
