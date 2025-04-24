// pages/index.js
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/create-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference, amount })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Unknown error');
      router.push(`/payment?token=${encodeURIComponent(data.token)}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Criar Pagamento</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          Referência:
          <input
            type="text"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>
        <label className="block mb-4">
          Valor (AOA):
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
          Pagar
        </button>
      </form>
    </div>
  );
}
