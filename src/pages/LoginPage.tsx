
import React from "react";

/**
 * Página de login minimalista, SEM menu e footer.
 * Pronta para conectar com backend PHP/Laravel via API.
 */
const LoginPage = () => {
  // Aqui você pode conectar seu backend! Basta usar fetch/axios para sua API PHP/Laravel
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-darkblue text-center">Entrar na sua Conta</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">E-mail</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              placeholder="Digite seu email"
              autoFocus
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              placeholder="Sua senha"
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-darkblue text-white rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Entrar
          </button>
        </form>
        {/* Local reservado para notificação de erro/sucesso no futuro */}
      </div>
    </div>
  );
};

export default LoginPage;
