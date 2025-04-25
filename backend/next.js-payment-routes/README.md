
# Next.js API Routes para Integração com Gateway de Pagamento EMIS

Este código fornece a implementação de rotas de API em Next.js para integração com o gateway de pagamento EMIS, substituindo a versão PHP anterior.

## Arquivos

1. `pages/api/pagar.js` - Substitui o arquivo `pagar.php`. Gera um token de compra e redireciona para o frame de pagamento.
2. `pages/api/gpo-callback.js` - Substitui o arquivo `gpo-callback.php`. Recebe e processa callbacks do gateway de pagamento.
3. `pages/api/gpo-frame.js` - Substitui o arquivo `gpo-frame.php`. Renderiza um iframe para o processo de pagamento.
4. `utils/payment-utils.js` - Funções utilitárias para interação com o gateway de pagamento.

## Instruções de Integração com Vercel

1. Copie os arquivos das rotas API para a pasta `pages/api` em seu projeto Next.js.

2. Configure as seguintes variáveis de ambiente no painel da Vercel:
   - `GPO_FRAME_TOKEN` - Token de acesso ao gateway
   - `GPO_API_URL` - URL da API do gateway
   - `GPO_CSS_URL` - URL do CSS para personalização
   - `CALLBACK_URL` - URL completa do endpoint de callback (ex: https://seusite.vercel.app/api/gpo-callback)

3. Atualize o frontend para apontar para as novas rotas da API:
   - No arquivo `PaymentIntegration.tsx`, a URL de submissão do formulário já está configurada para `/api/pagar`

4. Para logs de produção, considere usar um serviço como Vercel Logs ou integrar com Sentry, LogRocket, ou similar.

## Observações Importantes

- Na Vercel, não é possível escrever em arquivos de log diretamente. Os logs são enviados para o console e podem ser visualizados no painel da Vercel.
- Para persistir logs de callback, considere usar um banco de dados como MongoDB, Supabase, ou similar.

