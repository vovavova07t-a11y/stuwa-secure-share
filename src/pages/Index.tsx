
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SecuritySection } from "@/components/SecuritySection";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Cog, Truck, TrendingUp, Phone, Shield, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const departments = [
    {
      title: "О нас",
      description: "Финансовая дирекция",
      icon: Building2,
      path: "/about",
      color: "text-blue-600 bg-blue-50"
    },
    {
      title: "Продукция",
      description: "Техническая дирекция",
      icon: Cog,
      path: "/technical",
      color: "text-green-600 bg-green-50"
    },
    {
      title: "Клиенты",
      description: "Управление логистики",
      icon: Truck,
      path: "/logistics",
      color: "text-orange-600 bg-orange-50"
    },
    {
      title: "Развитие",
      description: "Коммерческая дирекция",
      icon: TrendingUp,
      path: "/commercial",
      color: "text-purple-600 bg-purple-50"
    },
    {
      title: "Контакты",
      description: "Офис-менеджер",
      icon: Phone,
      path: "/contacts",
      color: "text-red-600 bg-red-50"
    }
  ];

  const specialSections = [
    {
      title: "Панель администратора",
      description: "Системное управление и настройки",
      icon: Users,
      path: "/admin-dashboard",
      color: "text-gray-600 bg-gray-50"
    },
    {
      title: "Исполнительная панель",
      description: "Руководящий доступ",
      icon: Lock,
      path: "/executive-dashboard", 
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      title: "Панель организатора",
      description: "Координация всех отделов",
      icon: Shield,
      path: "/organizer-login",
      color: "text-emerald-600 bg-emerald-50"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Отделы компании</h2>
              <p className="text-xl text-muted-foreground">
                Выберите отдел для доступа к документам и ресурсам
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {departments.map((dept, index) => {
                const IconComponent = dept.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${dept.color} flex items-center justify-center mb-3`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl">{dept.title}</CardTitle>
                      <CardDescription>{dept.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link to={dept.path}>
                        <Button className="w-full">
                          Войти в отдел
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Специальные разделы */}
            <div className="border-t pt-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Специальные разделы</h3>
                <p className="text-muted-foreground">
                  Панели управления с расширенным доступом
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specialSections.map((section, index) => {
                  const IconComponent = section.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-dashed">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-3`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link to={section.path}>
                          <Button variant="outline" className="w-full">
                            Перейти
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <SecuritySection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
