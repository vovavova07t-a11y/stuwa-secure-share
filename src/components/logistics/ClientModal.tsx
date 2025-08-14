
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { LogisticsClient } from '@/types/logistics';

interface ClientModalProps {
  client?: LogisticsClient | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const ClientModal: React.FC<ClientModalProps> = ({ client, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: client?.company_name || '',
    contact_person: client?.contact_person || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    city: client?.city || '',
    country: client?.country || 'Germany',
    client_type: client?.client_type || 'corporate',
    status: client?.status || 'active',
    industry: client?.industry || '',
    annual_revenue: client?.annual_revenue || '',
    notes: client?.notes || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = await supabase.auth.getUser();
      if (!userData.data.user) {
        throw new Error('Пользователь не авторизован');
      }

      const dataToSubmit = {
        ...formData,
        annual_revenue: formData.annual_revenue ? parseFloat(formData.annual_revenue as string) : null,
        created_by: client ? undefined : userData.data.user.id
      };

      if (client) {
        const { error } = await (supabase as any)
          .from('logistics_clients')
          .update(dataToSubmit)
          .eq('id', client.id);
        
        if (error) throw error;
        
        toast({
          title: 'Успех',
          description: 'Клиент успешно обновлен'
        });
      } else {
        const { error } = await (supabase as any)
          .from('logistics_clients')
          .insert([dataToSubmit]);
        
        if (error) throw error;
        
        toast({
          title: 'Успех',
          description: 'Клиент успешно добавлен'
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving client:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить клиента',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {client ? 'Редактировать клиента' : 'Добавить нового клиента'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Название компании *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact_person">Контактное лицо</Label>
              <Input
                id="contact_person"
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Страна</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="client_type">Тип клиента</Label>
              <Select value={formData.client_type} onValueChange={(value) => setFormData({ ...formData, client_type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Корпоративный</SelectItem>
                  <SelectItem value="individual">Частное лицо</SelectItem>
                  <SelectItem value="partner">Партнер</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Активный</SelectItem>
                  <SelectItem value="inactive">Неактивный</SelectItem>
                  <SelectItem value="potential">Потенциальный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry">Отрасль</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="annual_revenue">Годовой доход (€)</Label>
              <Input
                id="annual_revenue"
                type="number"
                value={formData.annual_revenue}
                onChange={(e) => setFormData({ ...formData, annual_revenue: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Заметки</Label>
            <Textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
