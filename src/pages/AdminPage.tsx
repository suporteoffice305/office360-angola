
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/hooks/useCart';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

/**
 * Dashboard de administração para gestão de vendas e monitoramento
 * - Preparado para integração com PHP/Laravel e MySQL
 * - Contém gráficos para visualização de dados
 * - Detecção de carrinhos abandonados e vendas concluídas
 */
const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Dados simulados para os gráficos (serão substituídos por dados reais do backend)
  const salesData = [
    { name: 'Jan', value: 1200 },
    { name: 'Fev', value: 1900 },
    { name: 'Mar', value: 2800 },
    { name: 'Abr', value: 2400 },
    { name: 'Mai', value: 2700 },
    { name: 'Jun', value: 3500 },
    { name: 'Jul', value: 3800 },
  ];

  const productData = [
    { name: 'Windows 10 Pro', value: 45 },
    { name: 'Windows Server', value: 25 },
    { name: 'Exchange Server', value: 15 },
    { name: 'Office 365', value: 35 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const conversionData = [
    { name: 'Visitantes', value: 1000 },
    { name: 'Adicionaram ao Carrinho', value: 450 },
    { name: 'Iniciaram Checkout', value: 200 },
    { name: 'Compraram', value: 120 },
  ];

  // Dados simulados para carrinhos abandonados
  const abandonedCarts = [
    { id: 1, email: 'cliente1@example.com', products: 'Windows 10 Pro (2)', value: 20000, date: '2023-10-15' },
    { id: 2, email: 'cliente2@example.com', products: 'Office 365 (1)', value: 45000, date: '2023-10-14' },
    { id: 3, email: 'cliente3@example.com', products: 'Windows Server (1), Exchange (1)', value: 1000000, date: '2023-10-12' },
  ];

  // Dados simulados para vendas concluídas
  const completedSales = [
    { id: 101, customer: 'Empresa ABC Lda', products: 'Windows 10 Pro (10)', value: 100000, date: '2023-10-15', status: 'Pago' },
    { id: 102, customer: 'Consultoria XYZ', products: 'Office 365 (25)', value: 1125000, date: '2023-10-14', status: 'Processando' },
    { id: 103, customer: 'Tech Solutions', products: 'Windows Server (2), Exchange (1)', value: 1150000, date: '2023-10-10', status: 'Pago' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-darkblue">Painel Administrativo</h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Exportar Relatórios</Button>
              <Button className="bg-darkblue hover:bg-blue-800" size="sm">Atualizar Dados</Button>
            </div>
          </div>

          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="abandoned">Carrinhos Abandonados</TabsTrigger>
              <TabsTrigger value="sales">Vendas Concluídas</TabsTrigger>
            </TabsList>
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento Total</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.375.000 Kz</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+12%</span> em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Vendas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">48</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+8%</span> em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conversão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12%</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500">+2%</span> em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Carrinhos Abandonados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">22</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-red-500">-4%</span> em relação ao mês anterior
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
            </TabsContent>
            
            {/* Abandoned Carts Tab */}
            <TabsContent value="abandoned">
              <Card>
                <CardHeader>
                  <CardTitle>Carrinhos Abandonados</CardTitle>
                  <CardDescription>
                    Clientes que adicionaram produtos mas não finalizaram a compra
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">ID</th>
                          <th className="py-3 px-4 text-left">Email</th>
                          <th className="py-3 px-4 text-left">Produtos</th>
                          <th className="py-3 px-4 text-left">Valor</th>
                          <th className="py-3 px-4 text-left">Data</th>
                          <th className="py-3 px-4 text-left">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {abandonedCarts.map((cart) => (
                          <tr key={cart.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{cart.id}</td>
                            <td className="py-3 px-4">{cart.email}</td>
                            <td className="py-3 px-4">{cart.products}</td>
                            <td className="py-3 px-4">{cart.value.toLocaleString('pt-AO')} Kz</td>
                            <td className="py-3 px-4">{cart.date}</td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">Enviar Lembrete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {abandonedCarts.length === 0 && (
                      <p className="text-center py-6 text-muted-foreground">
                        Não há carrinhos abandonados.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Sales Tab */}
            <TabsContent value="sales">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Concluídas</CardTitle>
                  <CardDescription>
                    Pedidos finalizados e pagamentos processados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left">ID</th>
                          <th className="py-3 px-4 text-left">Cliente</th>
                          <th className="py-3 px-4 text-left">Produtos</th>
                          <th className="py-3 px-4 text-left">Valor</th>
                          <th className="py-3 px-4 text-left">Data</th>
                          <th className="py-3 px-4 text-left">Status</th>
                          <th className="py-3 px-4 text-left">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {completedSales.map((sale) => (
                          <tr key={sale.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{sale.id}</td>
                            <td className="py-3 px-4">{sale.customer}</td>
                            <td className="py-3 px-4">{sale.products}</td>
                            <td className="py-3 px-4">{sale.value.toLocaleString('pt-AO')} Kz</td>
                            <td className="py-3 px-4">{sale.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                sale.status === 'Pago' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {sale.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {completedSales.length === 0 && (
                      <p className="text-center py-6 text-muted-foreground">
                        Não há vendas concluídas.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const AdminPage = () => {
  return (
    <CartProvider>
      <AdminContent />
    </CartProvider>
  );
};

export default AdminPage;
