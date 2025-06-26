
import React from 'react';
import { Plus, Search, Edit, Trash2, ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import OrderForm from '@/components/OrderForm';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: number;
  clientName: string;
  date: string;
  total: number;
  status: 'pendente' | 'processando' | 'concluido' | 'cancelado';
}

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = React.useState<Order[]>([
    {
      id: 1,
      clientName: 'João Silva',
      date: '2024-01-15',
      total: 85.50,
      status: 'concluido'
    },
    {
      id: 2,
      clientName: 'Maria Santos',
      date: '2024-01-16',
      total: 142.30,
      status: 'processando'
    },
    {
      id: 3,
      clientName: 'Pedro Costa',
      date: '2024-01-16',
      total: 67.80,
      status: 'pendente'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);
  const [sortField, setSortField] = React.useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const filteredAndSortedOrders = orders
    .filter(order =>
      order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

  const handleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'processando': return 'bg-blue-100 text-blue-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder = {
      ...orderData,
      id: Math.max(...orders.map(o => o.id), 0) + 1
    };
    
    setOrders(prev => [...prev, newOrder]);
    setShowForm(false);
    
    toast({
      title: "Pedido criado com sucesso!",
      description: `Pedido #${newOrder.id} foi criado.`,
    });
  };

  const handleEditOrder = (orderData: Omit<Order, 'id'>) => {
    if (!editingOrder) return;
    
    setOrders(prev => prev.map(o => 
      o.id === editingOrder.id 
        ? { ...orderData, id: editingOrder.id }
        : o
    ));
    
    setEditingOrder(null);
    setShowForm(false);
    
    toast({
      title: "Pedido atualizado com sucesso!",
      description: `Pedido #${editingOrder.id} foi atualizado.`,
    });
  };

  const handleDeleteOrder = (id: number) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    
    toast({
      title: "Pedido removido",
      description: `Pedido #${id} foi removido do sistema.`,
      variant: "destructive",
    });
  };

  const startEdit = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <OrderForm
          order={editingOrder || undefined}
          onSubmit={editingOrder ? handleEditOrder : handleCreateOrder}
          onCancel={cancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos</h1>
          <p className="text-gray-600">Gerencie os pedidos do seu mercado</p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Pedido
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {orders.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('id')}
                >
                  # Pedido {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('clientName')}
                >
                  Cliente {sortField === 'clientName' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('date')}
                >
                  Data {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('total')}
                >
                  Total {sortField === 'total' && (sortDirection === 'asc' ? '↑' : '↓')}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span>#{order.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    R$ {order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(order)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredAndSortedOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Nenhum pedido encontrado para sua pesquisa.' : 'Nenhum pedido cadastrado.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
