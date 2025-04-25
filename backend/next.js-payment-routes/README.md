
# Next.js API Routes para Integração de Pagamento

Este código fornece implementação de rotas API em Next.js para integração com o gateway de pagamento EMIS. Substitui completamente a versão PHP anterior.

## Arquivos Principais

1. `pages/api/pagar.js` - API que recebe os dados de pagamento, gera um token de compra e redireciona para o frame de pagamento.
2. `pages/api/gpo-callback.js` - Endpoint que recebe callbacks do gateway após processamento do pagamento.
3. `pages/api/gpo-frame.js` - Renderiza o iframe da página de pagamento usando o token gerado.
4. `utils/payment-utils.js` - Contém funções auxiliares para interação com a API do gateway.

## Instruções para Deployment no Vercel

### 1. Estrutura de Arquivos

Certifique-se que os seguintes arquivos estão na pasta correta no seu projeto Next.js:

```
└── pages/
    └── api/
        ├── pagar.js
        ├── gpo-callback.js
        └── gpo-frame.js
└── utils/
    └── payment-utils.js
```

### 2. Deploy na Vercel

1. Faça login no [dashboard da Vercel](https://vercel.com)
2. Importe seu projeto do repositório Git
3. Na configuração do projeto, defina as variáveis de ambiente:
   - `GPO_FRAME_TOKEN` - Token de integração do gateway (opcional, está hardcoded)
   - `GPO_API_URL` - URL da API do gateway (opcional, está hardcoded)
   - `CALLBACK_URL` - URL completa do seu endpoint de callback

4. Defina as seguintes configurações no seu projeto Vercel:
   - **Root Directory**: Se seus arquivos estiverem em uma subpasta, especifique o caminho aqui
   - **Build Command**: `npm run build` ou `next build`
   - **Output Directory**: `.next`

5. Clique em "Deploy" para iniciar o deployment

### 3. Solução de Problemas Comuns

Se aparecer erro 404 (NOT_FOUND) ao tentar acessar `/api/pagar`, verifique:

1. Confirme que os arquivos estão na estrutura correta (dentro de `pages/api/`)
2. Verifique que o domínio está correto (use URL completo como `https://seu-site.vercel.app/api/pagar`)
3. Confirme que o deployment foi bem-sucedido sem erros de build
4. Verifique os logs do servidor na dashboard da Vercel para identificar possíveis erros

### 4. Teste e Verificação

Após o deployment, verifique se todas as rotas estão funcionando:

- `/api/pagar` - Deve aceitar requisições POST
- `/api/gpo-callback` - Deve estar acessível para o gateway
- `/api/gpo-frame` - Deve renderizar um iframe quando acessado com um token

## Integração com o Frontend React

No frontend, configure o componente PaymentIntegration.tsx para enviar o formulário para a URL completa:
`form.action = 'https://seu-site.vercel.app/api/pagar';`

Substitua "seu-site.vercel.app" pelo domínio real do seu projeto na Vercel.
