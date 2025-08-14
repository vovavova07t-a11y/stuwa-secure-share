
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Package, 
  Star, 
  TrendingUp,
  BarChart3,
  Target
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const products = [
    {
      id: 'PROD-001',
      name: 'Высокопрочная сталь Grade A',
      category: 'Металлы',
      subcategory: 'Конструкционная сталь',
      price: '€1,250/тонна',
      salesRank: 1,
      profitMargin: '25%',
      stock: 'В наличии',
      salesTarget: '150 тонн/месяц',
      actualSales: '142 тонн',
      clientInterest: 'Высокий',
      description: 'Высококачественная конструкционная сталь для автомобильной промышленности'
    },
    {
      id: 'PROD-002',
      name: 'Алюминиевый сплав AL-2024',
      category: 'Металлы',
      subcategory: 'Алюминиевые сплавы',
      price: '€2,850/тонна',
      salesRank: 2,
      profitMargin: '32%',
      stock: 'Ограничено',
      salesTarget: '80 тонн/месяц',
      actualSales: '95 тонн',
      clientInterest: 'Высокий',
      description: 'Авиационный алюминиевый сплав повышенной прочности'
    },
    {
      id: 'PROD-003',
      name: 'Композитные материалы CF-Pro',
      category: 'Композиты',
      subcategory: 'Углеродное волокно',
      price: '€12,500/м²',
      salesRank: 5,
      profitMargin: '45%',
      stock: 'Под заказ',
      salesTarget: '500 м²/месяц',
      actualSales: '380 м²',
      clientInterest: 'Средний',
      description: 'Углеродные композиты для высокотехнологичных применений'
    }
  ];

  const getStockBadge = (stock: string) => {
    const variants = {
      'В наличии': { color: 'bg-green-100 text-green-800' },
      'Ограничено': { color: 'bg-yellow-100 text-yellow-800' },
      'Под заказ': { color: 'bg-blue-100 text-blue-800' },
      'Нет в наличии': { color: 'bg-red-100 text-red-800' }
    };
    const variant = variants[stock as keyof typeof variants] || variants['В наличии'];
    return <Badge className={variant.color}>{stock}</Badge>;
  };

  const getInterestBadge = (interest: string) => {
    const variants = {
      'Высокий': { color: 'bg-green-100 text-green-800' },
      'Средний': { color: 'bg-yellow-100 text-yellow-800' },
      'Низкий': { color: 'bg-red-100 text-red-800' }
    };
    const variant = variants[interest as keyof typeof variants] || variants['Средний'];
    return <Badge className={variant.color}>{interest}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Статистика продуктов */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Всего продуктов</p>
                <p className="text-2xl font-bold">387</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Хиты продаж</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Высокая маржа</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Цель продаж</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Каталог продукции для продвижения
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск продукции..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="metals">Металлы</SelectItem>
                  <SelectItem value="composites">Композиты</SelectItem>
                  <SelectItem value="chemicals">Химия</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={showNewProductModal} onOpenChange={setShowNewProductModal}>
                <DialogTrigger asChild>
                  <Button className="btn-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить продукт
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Добавить новый продукт</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Название продукта *</Label>
                      <Input id="productName" placeholder="Введите название продукта" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="productCode">Код продукта</Label>
                      <Input id="productCode" placeholder="PROD-XXX" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Категория</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metals">Металлы</SelectItem>
                          <SelectItem value="composites">Композиты</SelectItem>
                          <SelectItem value="chemicals">Химия</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subcategory">Подкategoria</Label>
                      <Input id="subcategory" placeholder="Подкategoria продукта" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="price">Цена</Label>
                      <Input id="price" placeholder="€0.00" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profitMargin">Маржинальность (%)</Label>
                      <Input id="profitMargin" type="number" placeholder="25" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salesTarget">Цель продаж</Label>
                      <Input id="salesTarget" placeholder="100 единиц/месяц" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stock">Наличие</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Статус наличия" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">В наличии</SelectItem>
                          <SelectItem value="limited">Ограничено</SelectItem>
                          <SelectItem value="order">Под заказ</SelectItem>
                          <SelectItem value="unavailable">Нет в наличии</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="description">Описание продукта</Label>
                      <Textarea id="description" rows={3} placeholder="Подробное описание продукта и его преимуществ" />
                    </div>
                    
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="salesNotes">Заметки для продаж</Label>
                      <Textarea id="salesNotes" rows={2} placeholder="Ключевые преимущества и особенности для презентации клиентам" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setShowNewProductModal(false)}>
                      Отмена
                    </Button>
                    <Button onClick={() => setShowNewProductModal(false)}>
                      Добавить продукт
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Продукт</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена</TableHead>
                  <TableHead>Рейтинг продаж</TableHead>
                  <TableHead>Маржа</TableHead>
                  <TableHead>Наличие</TableHead>
                  <TableHead>Цель/Факт</TableHead>
                  <TableHead>Интерес</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.category}</div>
                        <div className="text-sm text-muted-foreground">{product.subcategory}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{product.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        #{product.salesRank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {product.profitMargin}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStockBadge(product.stock)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{product.salesTarget}</div>
                        <div className="text-muted-foreground">{product.actualSales}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getInterestBadge(product.clientInterest)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
