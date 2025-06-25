
import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import ProductForm from '@/components/ProductForm';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = React.useState<Product[]>([
    {
      id: 1,
      name: 'Leite Integral 1L',
      price: 4.99,
      stock: 50,
      category: 'Alimentos',
      description: 'Leite integral pasteurizado'
    },
    {
      id: 2,
      name: 'Pão Francês',
      price: 0.80,
      stock: 100,
      category: 'Padaria',
      description: 'Pão francês fresquinho'
    },
    {
      id: 3,
      name: 'Detergente 500ml',
      price: 3.50,
      stock: 25,
      category: 'Limpeza',
      description: 'Detergente líquido para louças'
    },
    {
      id: 4,
      name: 'Refrigerante Cola 2L',
      price: 8.90,
      stock: 30,
      category: 'Bebidas',
      description: 'Refrigerante sabor cola'
    },
    {
      id: 5,
      name: 'Açúcar Crystal 1kg',
      price: 4.20,
      stock: 5,
      category: 'Alimentos',
      description: 'Açúcar cristal refinado'
    },
    {
      id: 6,
      name: 'Shampoo 400ml',
      price: 12.90,
      stock: 15,
      category: 'Higiene',
      description: 'Shampoo para todos os tipos de cabelo'
    }
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [showForm, setShowForm] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    
    setProducts(prev => [...prev, newProduct]);
    setShowForm(false);
    
    toast({
      title: "Produto criado com sucesso!",
      description: `${newProduct.name} foi adicionado ao estoque.`,
    });
  };

  const handleEditProduct = (productData: Omit<Product, 'id'>) => {
    if (!editingProduct) return;
    
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? { ...productData, id: editingProduct.id }
        : p
    ));
    
    setEditingProduct(null);
    setShowForm(false);
    
    toast({
      title: "Produto atualizado com sucesso!",
      description: `${productData.name} foi atualizado.`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    const product = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    
    toast({
      title: "Produto removido",
      description: `${product?.name} foi removido do estoque.`,
      variant: "destructive",
    });
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ProductForm
          product={editingProduct || undefined}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          onCancel={cancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600">Gerencie o estoque do seu mercado</p>
        </div>
        
        <Button 
          onClick={() => setShowForm(true)}
          className="gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {products.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={startEdit}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchTerm ? 'Nenhum produto encontrado para sua pesquisa.' : 'Nenhum produto cadastrado.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
