
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building2, Calculator, Truck, Cog, Phone, Users } from 'lucide-react';

export const Navigation = () => {
  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/731a20c8-27b9-473f-90cc-ce84f4ebac8c.png" 
                alt="STUWA Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl text-primary">STUWA</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
