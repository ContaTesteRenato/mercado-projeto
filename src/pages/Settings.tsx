
import React from 'react';
import { Settings as SettingsIcon, User, Store, Bell, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState({
    storeName: 'SuperMercado',
    storeAddress: 'Rua das Flores, 123',
    managerName: 'João Silva',
    email: 'joao@supermercado.com',
    phone: '(11) 99999-9999',
    notifications: {
      lowStock: true,
      dailyReport: true,
      newSales: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    }
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas configurações foram atualizadas com sucesso.",
    });
  };

  const handleSettingChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof typeof prev] === 'object' 
        ? { ...prev[section as keyof typeof prev], [field]: value }
        : value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Gerencie as configurações do seu mercado</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Store className="w-5 h-5 text-blue-600" />
              <span>Informações da Loja</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input
                id="storeName"
                value={settings.storeName}
                onChange={(e) => handleSettingChange('storeName', '', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="storeAddress">Endereço</Label>
              <Input
                id="storeAddress"
                value={settings.storeAddress}
                onChange={(e) => handleSettingChange('storeAddress', '', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => handleSettingChange('phone', '', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-600" />
              <span>Informações do Usuário</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="managerName">Nome do Gerente</Label>
              <Input
                id="managerName"
                value={settings.managerName}
                onChange={(e) => handleSettingChange('managerName', '', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', '', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-yellow-600" />
              <span>Notificações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStock">Estoque Baixo</Label>
                <p className="text-sm text-gray-500">Receber alertas quando o estoque estiver baixo</p>
              </div>
              <Switch
                id="lowStock"
                checked={settings.notifications.lowStock}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'lowStock', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dailyReport">Relatório Diário</Label>
                <p className="text-sm text-gray-500">Receber relatório diário de vendas</p>
              </div>
              <Switch
                id="dailyReport"
                checked={settings.notifications.dailyReport}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'dailyReport', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newSales">Novas Vendas</Label>
                <p className="text-sm text-gray-500">Notificar sobre cada nova venda</p>
              </div>
              <Switch
                id="newSales"
                checked={settings.notifications.newSales}
                onCheckedChange={(checked) => handleSettingChange('notifications', 'newSales', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-red-600" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="twoFactor">Autenticação de Dois Fatores</Label>
                <p className="text-sm text-gray-500">Adicionar uma camada extra de segurança</p>
              </div>
              <Switch
                id="twoFactor"
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => handleSettingChange('security', 'twoFactor', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value) || 30)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          className="gradient-primary text-white hover:opacity-90 px-8"
        >
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default Settings;
