
import React from 'react';
import { Package, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const isLowStock = product.stock < 10;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg font-semibold text-gray-900">
              {product.name}
            </CardTitle>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(product)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estoque:</span>
            <div className="flex items-center space-x-1">
              {isLowStock && <AlertCircle className="w-4 h-4 text-yellow-500" />}
              <span className={`font-medium ${isLowStock ? 'text-yellow-600' : 'text-gray-900'}`}>
                {product.stock} unidades
              </span>
            </div>
          </div>
          
          {product.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
