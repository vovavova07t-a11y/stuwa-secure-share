
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FinancialDashboard } from '@/components/FinancialDashboard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, AlertTriangle } from 'lucide-react';

const AboutUs = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasFinancialAccess, setHasFinancialAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndAccess();
  }, []);

  const checkAuthAndAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setIsAuthenticated(true);
        
        // Check if user has financial department access using direct table query
        const { data: roles } = await (supabase as any)
          .from('user_roles')
          .select('*')
          .eq('user_id', user.id)
          .eq('department', 'financial');
        
        if (roles && roles.length > 0) {
          setHasFinancialAccess(true);
        } else {
          // Check if user is admin
          const { data: { user: authUser } } = await supabase.auth.getUser();
          if (authUser?.email === 'edikkim20@gmail.com') {
            setHasFinancialAccess(true);
          }
        }
      }
    } catch (error) {
      console.error('Error checking access:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={false}
          onAuthClick={() => window.location.href = '/'}
        />
        
        <div className="container mx-auto px-4 py-20">
          <Card className="glass-card max-w-md mx-auto text-center">
            <CardHeader>
              <div className="feature-icon mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <CardTitle>Требуется аутентификация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Для доступа к разделу "О нас" необходимо войти в систему
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="btn-primary w-full"
              >
                Войти в систему
              </button>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (!hasFinancialAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          isAuthenticated={true}
          onAuthClick={() => {}}
        />
        
        <div className="container mx-auto px-4 py-20">
          <Card className="glass-card max-w-md mx-auto text-center">
            <CardHeader>
              <div className="feature-icon mx-auto mb-4">
                <Shield className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle>Доступ ограничен</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                У вас нет доступа к разделу Финансовой дирекции. 
                Обратитесь к администратору для получения необходимых прав доступа.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>Требуется роль финансового отдела</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        isAuthenticated={true}
        onAuthClick={() => {}}
      />
      
      <FinancialDashboard />
      
      <Footer />
    </div>
  );
};

export default AboutUs;
