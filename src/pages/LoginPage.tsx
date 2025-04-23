
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { CartProvider } from '@/hooks/useCart';

/**
 * Componente da tela de Login e Cadastro.
 * NÃO TEM HEADER NEM FOOTER aqui para manter o foco do usuário no login/cadastro.
 * Pronto para integração com Supabase ou outro backend.
 */
const LoginContent = () => {
  // Estado do tipo de formulário: "login" ou "register"
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  // Inputs controlados: login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Inputs controlados: cadastro
  const [registerFields, setRegisterFields] = useState({ email: '', password: '', name: '' });

  // Handler fictício de login - trocar/ajustar para integração real com backend!
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui deve fazer a chamada real para supabase ou api de autenticação
    alert("Backend de autenticação não implementado. Implemente sua integração aqui.");
  };

  // Handler fictício de cadastro - trocar/ajustar para integração real com backend!
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui deve fazer a chamada real para supabase ou api de cadastro
    alert("Backend de cadastro não implementado. Implemente sua integração aqui.");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      {/* Box centralizado */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md animate-fade-in">
        {/* Header com abas */}
        <div className="flex mb-8">
          <button
            className={`flex-1 py-2 font-bold rounded-l-lg ${activeTab === 'login' ? 'bg-darkblue text-white' : 'bg-gray-100 text-gray-600'} transition`}
            onClick={() => setActiveTab('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-bold rounded-r-lg ${activeTab === 'register' ? 'bg-darkblue text-white' : 'bg-gray-100 text-gray-600'} transition`}
            onClick={() => setActiveTab('register')}
            type="button"
          >
            Cadastro
          </button>
        </div>
        {/* Formulário de Login */}
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
            {/* Botão de Login */}
            <Button
              type="submit"
              className="w-full bg-darkblue hover:bg-blue-800 text-white font-bold mt-2 h-12 rounded-lg transition-all"
            >
              Entrar
            </Button>
            {/* Recuperação de senha */}
            <div className="mt-4 text-sm text-center text-gray-500">
              Esqueceu sua senha? <span className="underline cursor-pointer hover:text-darkblue">Recuperar</span>
            </div>
          </form>
        )}
        {/* Formulário de Cadastro */}
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
            {/* Botão de Cadastro */}
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
    </div>
  );
};

/**
 * O CartProvider está aqui, MAS a tela não renderiza menu nem footer,
 * fica pronta para integração: basta plugar as chamadas de autenticação/cadastro.
 */
const LoginPage = () => (
  <CartProvider>
    <LoginContent />
  </CartProvider>
);

export default LoginPage;

