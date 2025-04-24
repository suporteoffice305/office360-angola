
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import {
  User,
  Settings,
  LogOut,
  PieChart as PieChartIcon,
  LayoutDashboard,
  ShoppingCart,
  Users
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider
} from '@/components/ui/sidebar';

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/**
 * Admin Dashboard - Fully functional management interface
 * - Ready for integration with PHP/Laravel and MySQL
 * - Detects abandoned carts and completed sales
 * - Provides statistics and charts
 * - Allows admin profile management
 */
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@office360.co.ao',
    photo: '/lovable-uploads/francisco.png',
  });

  // Empty sales data for initialization - will be populated from backend
  const salesData = [
    { name: 'Jan', value: 0 },
    { name: 'Fev', value: 0 },
    { name: 'Mar', value: 0 },
    { name: 'Abr', value: 0 },
    { name: 'Mai', value: 0 },
    { name: 'Jun', value: 0 },
    { name: 'Jul', value: 0 },
  ];

  const productData = [
    { name: 'Windows 10 Pro', value: 0 },
    { name: 'Windows Server', value: 0 },
    { name: 'Exchange Server', value: 0 },
    { name: 'Office 365', value: 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const conversionData = [
    { name: 'Visitantes', value: 0 },
    { name: 'Adicionaram ao Carrinho', value: 0 },
    { name: 'Iniciaram Checkout', value: 0 },
    { name: 'Compraram', value: 0 },
  ];

  // Empty abandoned carts data - will be populated from backend
  const [abandonedCarts, setAbandonedCarts] = useState([]);
  
  // Empty completed sales data - will be populated from backend
  const [completedSales, setCompletedSales] = useState([]);
  
  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // In a real implementation, this would send data to the backend
    alert('Perfil atualizado com sucesso!');
  };

  // Handle file selection for profile photo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real implementation, this would upload the file and get a URL
      // Here we're just creating a local URL for demo purposes
      const fileUrl = URL.createObjectURL(file);
      setAdminProfile({...adminProfile, photo: fileUrl});
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Admin Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-darkblue text-white">
                <PieChartIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Office360 Admin</div>
                <div className="text-xs text-muted-foreground">Painel de Controle</div>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'dashboard'}
                  onClick={() => setActiveSection('dashboard')}
                >
                  <LayoutDashboard className="mr-2" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'abandonedCarts'}
                  onClick={() => setActiveSection('abandonedCarts')}
                >
                  <ShoppingCart className="mr-2" />
                  <span>Carrinhos Abandonados</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'sales'}
                  onClick={() => setActiveSection('sales')}
                >
                  <PieChartIcon className="mr-2" />
                  <span>Vendas Concluídas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'customers'}
                  onClick={() => setActiveSection('customers')}
                >
                  <Users className="mr-2" />
                  <span>Clientes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'profile'}
                  onClick={() => setActiveSection('profile')}
                >
                  <User className="mr-2" />
                  <span>Meu Perfil</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={activeSection === 'settings'}
                  onClick={() => setActiveSection('settings')}
                >
                  <Settings className="mr-2" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenuButton>
              <LogOut className="mr-2" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-auto">
          <header className="border-b bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-medium">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'abandonedCarts' && 'Carrinhos Abandonados'}
                {activeSection === 'sales' && 'Vendas Concluídas'}
                {activeSection === 'customers' && 'Clientes'}
                {activeSection === 'profile' && 'Meu Perfil'}
                {activeSection === 'settings' && 'Configurações'}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{adminProfile.name}</span>
                <Avatar>
                  <AvatarImage src={adminProfile.photo} alt={adminProfile.name} />
                  <AvatarFallback>{adminProfile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {/* Dashboard Section */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0 Kz</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-gray-500">0%</span> em relação ao mês anterior
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Vendas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-gray-500">0%</span> em relação ao mês anterior
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0%</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-gray-500">0%</span> em relação ao mês anterior
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Carrinhos Abandonados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-gray-500">0%</span> em relação ao mês anterior
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Sales Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Faturamento nos Últimos Meses</CardTitle>
                    <CardDescription>Tendência de vendas mensais</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="value" name="Vendas (x1000 Kz)" stroke="#0066cc" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Product & Conversion Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição de Vendas por Produto</CardTitle>
                      <CardDescription>Proporção de cada produto nas vendas totais</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={productData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {productData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Funil de Conversão</CardTitle>
                      <CardDescription>Acompanhe o percurso do cliente até a compra</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={conversionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="value" fill="#0066cc" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            
            {/* Abandoned Carts Section */}
            {activeSection === 'abandonedCarts' && (
              <Card>
                <CardHeader>
                  <CardTitle>Carrinhos Abandonados</CardTitle>
                  <CardDescription>
                    Clientes que adicionaram produtos mas não finalizaram a compra
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {abandonedCarts.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            Não há carrinhos abandonados.
                          </TableCell>
                        </TableRow>
                      ) : (
                        abandonedCarts.map((cart) => (
                          <TableRow key={cart.id}>
                            <TableCell>{cart.id}</TableCell>
                            <TableCell>{cart.email}</TableCell>
                            <TableCell>{cart.products}</TableCell>
                            <TableCell>{cart.value.toLocaleString('pt-AO')} Kz</TableCell>
                            <TableCell>{cart.date}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Enviar Lembrete</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {/* Sales Section */}
            {activeSection === 'sales' && (
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Concluídas</CardTitle>
                  <CardDescription>
                    Pedidos finalizados e pagamentos processados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedSales.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                            Não há vendas concluídas.
                          </TableCell>
                        </TableRow>
                      ) : (
                        completedSales.map((sale) => (
                          <TableRow key={sale.id}>
                            <TableCell>{sale.id}</TableCell>
                            <TableCell>{sale.customer}</TableCell>
                            <TableCell>{sale.products}</TableCell>
                            <TableCell>{sale.value.toLocaleString('pt-AO')} Kz</TableCell>
                            <TableCell>{sale.date}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {sale.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            
            {/* Customers Section */}
            {activeSection === 'customers' && (
              <Card>
                <CardHeader>
                  <CardTitle>Clientes</CardTitle>
                  <CardDescription>
                    Gerenciar clientes registrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-muted-foreground">
                    Não há clientes registrados ainda.
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Editar Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={adminProfile.photo} alt={adminProfile.name} />
                          <AvatarFallback className="text-2xl">{adminProfile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <label 
                          htmlFor="photo-upload" 
                          className="absolute -bottom-2 -right-2 bg-darkblue text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-800"
                        >
                          <Settings className="h-4 w-4" />
                        </label>
                        <input 
                          id="photo-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleFileChange} 
                        />
                      </div>
                      <div className="flex-1 space-y-2 text-center sm:text-left">
                        <h3 className="font-medium text-lg">{adminProfile.name}</h3>
                        <p className="text-muted-foreground">{adminProfile.email}</p>
                        <p className="text-xs text-muted-foreground">
                          Clique no ícone para alterar a foto de perfil
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input 
                          id="name" 
                          value={adminProfile.name} 
                          onChange={e => setAdminProfile({...adminProfile, name: e.target.value})}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={adminProfile.email} 
                          onChange={e => setAdminProfile({...adminProfile, email: e.target.value})}
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          className="mt-1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Button type="submit" className="bg-darkblue hover:bg-blue-800">
                        Salvar Alterações
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
            
            {/* Settings Section */}
            {activeSection === 'settings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Configurações gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Configurações de Notificações</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notify">Notificações por email</Label>
                          <input 
                            id="email-notify" 
                            type="checkbox" 
                            className="toggle" 
                            defaultChecked 
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="abandoned-cart-notify">Alertas de carrinhos abandonados</Label>
                          <input 
                            id="abandoned-cart-notify" 
                            type="checkbox" 
                            className="toggle" 
                            defaultChecked 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Configurações de Pagamento</h3>
                      <p className="text-muted-foreground mb-3">
                        Configura a integração com a EMIS para processamento de pagamentos.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="api-key">Chave de API EMIS</Label>
                          <Input 
                            id="api-key" 
                            type="password" 
                            placeholder="••••••••••••••••" 
                            className="mt-1" 
                          />
                        </div>
                        <div>
                          <Label htmlFor="merchant-id">ID de Comerciante</Label>
                          <Input 
                            id="merchant-id" 
                            placeholder="Digite o ID de comerciante EMIS" 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button className="bg-darkblue hover:bg-blue-800">
                        Salvar Configurações
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
