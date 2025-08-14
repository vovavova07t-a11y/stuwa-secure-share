
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import type { LogisticsSale } from '@/types/logistics';

interface SaleModalProps {
  sale?: LogisticsSale | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const SaleModal: React.FC<SaleModalProps> = ({ sale, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sale_date: sale?.sale_date || new Date().toISOString().split('T')[0],
    product_service: sale?.product_service || '',
    quantity: sale?.quantity || '',
    unit_price: sale?.unit_price || '',
    total_amount: sale?.total_amount || '',
    currency: sale?.currency || 'EUR',
    status: sale?.status || 'pending',
    region: sale?.region || 'Germany'
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
        quantity: formData.quantity ? parseInt(formData.quantity as string) : null,
        unit_price: formData.unit_price ? parseFloat(formData.unit_price as string) : null,
        total_amount: parseFloat(formData.total_amount as string),
        created_by: sale ? undefined : userData.data.user.id
      };

      if (sale) {
        const { error } = await (supabase as any)
          .from('logistics_sales')
          .update(dataToSubmit)
          .eq('id', sale.id);
        
        if (error) throw error;
        
        toast({
          title: 'Успех',
          description: 'Продажа успешно обновлена'
        });
      } else {
        const { error } = await (supabase as any)
          .from('logistics_sales')
          .insert([dataToSubmit]);
        
        if (error) throw error;
        
        toast({
          title: 'Успех',
          description: 'Продажа успешно добавлена'
        });
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving sale:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось сохранить продажу',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {sale ? 'Редактировать продажу' : 'Добавить новую продажу'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sale_date">Дата продажи *</Label>
              <Input
                id="sale_date"
                type="date"
                value={formData.sale_date}
                onChange={(e) => setFormData({ ...formData, sale_date: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Статус</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Ожидание</SelectItem>
                  <SelectItem value="confirmed">Подтверждено</SelectItem>
                  <SelectItem value="shipped">Отгружено</SelectItem>
                  <SelectItem value="delivered">Доставлено</SelectItem>
                  <SelectItem value="cancelled">Отменено</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product_service">Продукт/Услуга *</Label>
            <Input
              id="product_service"
              value={formData.product_service}
              onChange={(e) => setFormData({ ...formData, product_service: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Количество</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unit_price">Цена за единицу</Label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                value={formData.unit_price}
                onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="total_amount">Общая сумма *</Label>
              <Input
                id="total_amount"
                type="number"
                step="0.01"
                value={formData.total_amount}
                onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Валюта</Label>
              <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Регион</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              />
            </div>
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
