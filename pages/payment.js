// pages/payment.js
import { useRouter } from 'next/router';

export default function Payment() {
  const router = useRouter();
  const { token } = router.query;

  // Aguarda o router estar pronto antes de acessar o token
  if (!router.isReady) return null;

  if (!token) return <p>Token não especificado.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <iframe
        src={`https://pagamentonline.emis.co.ao/online-payment-gateway/portal/frame?token=${encodeURIComponent(token)}`}
        className="w-full max-w-lg h-[650px] rounded-lg shadow-md"
        frameBorder="0"
      />
    </div>
  );
}
