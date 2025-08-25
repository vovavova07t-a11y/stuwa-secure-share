
import React, { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm transition-colors focus-within:border-blue-400/70 focus-within:bg-blue-500/10">
    {children}
  </div>
);

const CategoryLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Define all credentials with their routes
  const loginCredentials = [
    {
      username: 'fin_admin',
      password: 'FinStuwa2024!',
      route: '/about',
      name: 'Финансовая дирекция'
    },
    {
      username: 'tech_admin',
      password: 'TechStuwa2024!',
      route: '/technical',
      name: 'Техническая дирекция'
    },
    {
      username: 'log_admin',
      password: 'LogStuwa2024!',
      route: '/logistics',
      name: 'Управление логистики'
    },
    {
      username: 'com_admin',
      password: 'ComStuwa2024!',
      route: '/commercial',
      name: 'Коммерческая дирекция'
    },
    {
      username: 'office_admin',
      password: 'OfficeStuwa2024!',
      route: '/contacts',
      name: 'Офис-менеджер'
    },
    {
      username: 'inter_admin',
      password: 'InterStuwa2024!',
      route: '/interdepartment',
      name: 'Межотдельское взаимодействие'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      setError('Введите логин и пароль');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const matchedCredential = loginCredentials.find(cred => 
        credentials.username === cred.username && 
        credentials.password === cred.password
      );
      
      if (matchedCredential) {
        navigate(matchedCredential.route);
      } else {
        setError('Неверные учетные данные');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="h-[100dvh] flex flex-col md:flex-row w-[100dvw] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Left column: sign-in form */}
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            {/* Header with STUWA branding */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 animate-float">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="animate-fade-in text-4xl md:text-5xl font-semibold leading-tight text-white mb-2">
                STUWA
              </h1>
              <p className="animate-fade-in text-gray-300">
                Вход в корпоративную систему управления
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="animate-fade-in">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Логин</label>
                <GlassInputWrapper>
                  <input 
                    name="username" 
                    type="text" 
                    placeholder="Введите ваш логин" 
                    value={credentials.username}
                    onChange={(e) => {
                      setCredentials({...credentials, username: e.target.value});
                      setError('');
                    }}
                    className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none text-white placeholder-gray-400"
                    required
                    disabled={loading}
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-fade-in">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Пароль</label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input 
                      name="password" 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Введите ваш пароль" 
                      value={credentials.password}
                      onChange={(e) => {
                        setCredentials({...credentials, password: e.target.value});
                        setError('');
                      }}
                      className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none text-white placeholder-gray-400"
                      required
                      disabled={loading}
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute inset-y-0 right-3 flex items-center"
                      disabled={loading}
                    >
                      {showPassword ? 
                        <EyeOff className="w-5 h-5 text-gray-400 hover:text-white transition-colors" /> : 
                        <Eye className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      }
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {error && (
                <div className="animate-fade-in bg-red-900/20 border border-red-500/50 rounded-2xl p-4">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              <button 
                type="submit" 
                className="animate-fade-in w-full rounded-2xl bg-blue-600 hover:bg-blue-700 py-4 font-medium text-white transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Вход в систему...' : 'Войти в систему'}
              </button>
            </form>

            {/* Credentials display for development */}
            <div className="animate-fade-in mt-8 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-4 text-center">
                Тестовые учетные записи:
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {loginCredentials.map((cred, index) => (
                  <div key={index} className="bg-gray-700/30 p-3 rounded-xl text-xs border border-gray-600/50">
                    <p className="text-gray-300 font-medium mb-1">{cred.name}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-400">{cred.username}</span>
                      <span className="text-blue-400 font-mono text-[10px]">{cred.password}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right column: decorative background */}
      <section className="hidden md:block flex-1 relative p-4">
        <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-gray-900/40 backdrop-blur-xl border border-white/10">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white/80 max-w-md">
              <Shield className="w-24 h-24 mx-auto mb-6 text-blue-400 animate-float" />
              <h2 className="text-2xl font-bold mb-4">Система управления STUWA</h2>
              <p className="text-lg leading-relaxed">
                Безопасный доступ к корпоративным ресурсам и документообороту компании
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryLogin;
