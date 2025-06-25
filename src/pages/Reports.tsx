
import React from 'react';
import { BarChart3, TrendingUp, FileText, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { toast } = useToast();

  const reportData = {
    salesSummary: {
      today: { sales: 3, revenue: 68.68 },
      week: { sales: 15, revenue: 420.50 },
      month: { sales: 89, revenue: 2340.80 }
    },
    topProducts: [
      { name: 'Leite Integral 1L', sold: 45, revenue: 224.55 },
      { name: 'Pão Francês', sold: 120, revenue: 96.00 },
      { name: 'Refrigerante Cola 2L', sold: 25, revenue: 222.50 },
      { name: 'Detergente 500ml', sold: 18, revenue: 63.00 }
    ],
    categoryPerformance: [
      { category: 'Alimentos', sales: 156, percentage: 35 },
      { category: 'Bebidas', sales: 89, percentage: 20 },
      { category: 'Higiene', sales: 67, percentage: 15 },
      { category: 'Limpeza', sales: 45, percentage: 10 },
      { category: 'Padaria', sales: 89, percentage: 20 }
    ]
  };

  const handleExportReport = (type: string) => {
    toast({
      title: "Exportando relatório",
      description: `Relatório de ${type} será exportado em breve.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análise detalhada do desempenho do seu mercado</p>
        </div>
        
        <Button 
          onClick={() => handleExportReport('completo')}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Exportar Relatórios</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vendas Hoje
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {reportData.salesSummary.today.sales}
            </div>
            <p className="text-xs text-gray-500">
              R$ {reportData.salesSummary.today.revenue.toFixed(2)} em receita
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vendas da Semana
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reportData.salesSummary.week.sales}
            </div>
            <p className="text-xs text-gray-500">
              R$ {reportData.salesSummary.week.revenue.toFixed(2)} em receita
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Vendas do Mês
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {reportData.salesSummary.month.sales}
            </div>
            <p className="text-xs text-gray-500">
              R$ {reportData.salesSummary.month.revenue.toFixed(2)} em receita
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Produtos Mais Vendidos</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('produtos')}
            >
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} unidades vendidas</p>
                  </div>
                  <span className="font-semibold text-green-600">
                    R$ {product.revenue.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Desempenho por Categoria</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportReport('categorias')}
            >
              <Download className="w-4 h-4 mr-1" />
              Exportar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.categoryPerformance.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{category.category}</span>
                    <div className="text-right">
                      <span className="font-semibold text-blue-600">{category.sales}</span>
                      <span className="text-sm text-gray-500 ml-1">vendas</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">{category.percentage}% do total</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('estoque')}
            >
              <FileText className="w-6 h-6" />
              <span>Relatório de Estoque</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('vendas-diarias')}
            >
              <BarChart3 className="w-6 h-6" />
              <span>Vendas Diárias</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => handleExportReport('analise-financeira')}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Análise Financeira</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
