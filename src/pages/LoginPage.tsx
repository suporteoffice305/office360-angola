
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';

// Estado do tipo de formulário: "login" ou "register"
const LoginContent = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  // Inputs controlados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerFields, setRegisterFields] = useState({ email: '', password: '', name: '' });

  // Handlers de autenticação (front end apenas)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integração/autenticação real com Supabase aqui
    alert("👷‍♂️ Backend não implementado — Clique no botão SUPABASE no topo para ativar autenticação real!");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Registro real no banco de dados com Supabase
    alert("👷‍♂️ Backend não implementado — Clique no botão SUPABASE no topo para ativar autenticação real!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-16 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          {/* Header de abas */}
          <div className="flex mb-8">
            <button
              className={`flex-1 py-2 font-bold rounded-l-lg ${activeTab === 'login' ? 'bg-darkblue text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 font-bold rounded-r-lg ${activeTab === 'register' ? 'bg-darkblue text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('register')}
            >
              Cadastro
            </button>
          </div>
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6" autoComplete="off">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoFocus
                  placeholder="seu@email.com"
                  className="w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  className="w-full"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-darkblue hover:bg-blue-800 text-white font-bold mt-2 h-12 rounded-lg transition-all"
              >
                Entrar
              </Button>
              <div className="mt-4 text-sm text-center text-gray-500">
                Esqueceu sua senha? <span className="underline cursor-pointer hover:text-darkblue">Recuperar</span>
              </div>
            </form>
          )}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-6" autoComplete="off">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full"
                  value={registerFields.name}
                  onChange={e => setRegisterFields(f => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <Input
                  id="email-register"
                  name="email-register"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full"
                  value={registerFields.email}
                  onChange={e => setRegisterFields(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <Input
                  id="password-register"
                  name="password-register"
                  type="password"
                  placeholder="Crie uma senha"
                  className="w-full"
                  value={registerFields.password}
                  onChange={e => setRegisterFields(f => ({ ...f, password: e.target.value }))}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-darkblue hover:bg-blue-800 text-white font-bold mt-2 h-12 rounded-lg transition-all"
              >
                Criar Conta
              </Button>
              <div className="mt-4 text-sm text-center text-gray-500">
                Já tem uma conta?{' '}
                <span
                  className="underline cursor-pointer hover:text-darkblue"
                  onClick={() => setActiveTab("login")}
                >
                  Fazer Login
                </span>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

/**
 * ⚠️ TODO: Para conectar com seu banco de dados e autenticação,
 * ative a integração SUPABASE usando o botão verde no cabeçalho Lovable.
 * Não se esqueça de remover/comentar os alertas e implementar as funções
 * de autenticação reais depois de conectar!
 */
const LoginPage = () => (
  <CartProvider>
    <LoginContent />
  </CartProvider>
);

export default LoginPage;
