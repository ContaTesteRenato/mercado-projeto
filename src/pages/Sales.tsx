
import React from 'react';
import { Plus, Search, ShoppingCart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Sale {
  id: number;
  customer: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  date: string;
  time: string;
  status: 'completed' | 'cancelled';
}

const Sales = () => {
  const { toast } = useToast();
  const [sales, setSales] = React.useState<Sale[]>([
    {
      id: 1,
      customer: 'Maria Silva',
      items: [
        { name: 'Leite Integral 1L', quantity: 2, price: 4.99 },
        { name: 'Pão Francês', quantity: 10, price: 0.80 }
      ],
      total: 17.98,
      date: '2024-06-25',
      time: '10:30',
      status: 'completed'
    },
    {
      id: 2,
      customer: 'João Santos',
      items: [
        { name: 'Refrigerante Cola 2L', quantity: 3, price: 8.90 },
        { name: 'Detergente 500ml', quantity: 2, price: 3.50 }
      ],
      total: 33.70,
      date: '2024-06-25',
      time: '10:15',
      status: 'completed'
    },
    {
      id: 3,
      customer: 'Ana Costa',
      items: [
        { name: 'Açúcar Crystal 1kg', quantity: 1, price: 4.20 },
        { name: 'Shampoo 400ml', quantity: 1, price: 12.90 }
      ],
      total: 17.10,
      date: '2024-06-25',
      time: '09:45',
      status: 'completed'
    },
    {
      id: 4,
      customer: 'Pedro Lima',
      items: [
        { name: 'Leite Integral 1L', quantity: 1, price: 4.99 }
      ],
      total: 4.99,
      date: '2024-06-24',
      time: '16:20',
      status: 'cancelled'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredSales = sales.filter(sale =>
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toString().includes(searchTerm)
  );

  const todaySales = sales.filter(sale => sale.date === '2024-06-25' && sale.status === 'completed');
  const todayRevenue = todaySales.reduce((sum, sale) => sum + sale.total, 0);

  const handleNewSale = () => {
    toast({
      title: "Nova Venda",
      description: "Funcionalidade de nova venda será implementada.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendas</h1>
          <p className="text-gray-600">Gerencie as vendas do seu mercado</p>
        </div>
        
        <Button 
          onClick={handleNewSale}
          className="gradient-success text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Venda
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vendas Hoje
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {todaySales.length}
            </div>
            <p className="text-xs text-gray-500">
              Transações completadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Receita Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {todayRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">
              Faturamento do dia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Vendas
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {sales.length}
            </div>
            <p className="text-xs text-gray-500">
              Vendas registradas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Pesquisar vendas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        {filteredSales.map((sale) => (
          <Card key={sale.id} className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <CardTitle className="text-lg">Venda #{sale.id}</CardTitle>
                    <p className="text-sm text-gray-600">{sale.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">
                    R$ {sale.total.toFixed(2)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {sale.date} às {sale.time}
                    </span>
                    <Badge 
                      variant={sale.status === 'completed' ? 'default' : 'destructive'}
                    >
                      {sale.status === 'completed' ? 'Concluída' : 'Cancelada'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Itens:</h4>
                {sale.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                    <span>{item.name}</span>
                    <span className="text-gray-600">
                      {item.quantity}x R$ {item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Nenhuma venda encontrada para sua pesquisa.' : 'Nenhuma venda registrada.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Sales;
